import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { Text, TextInput, Textarea, Button, Select, Radio, Group, Modal, Image as ManImage } from '@mantine/core';
import { FiUploadCloud } from 'react-icons/fi';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import Image from 'next/image';
import designerImage from '../../images/designer.svg'
import { FiArrowRight, FiPlusCircle, FiXCircle } from 'react-icons/fi';
import { useState } from 'react';
import { showError } from '@/services/notification.service';
import { z } from 'zod'
import { useForm, zodResolver } from "@mantine/form"
import { http, httpEntry } from '@/services/axios.service';
import Link from 'next/link';
import { capitalizeFirst } from '@/services/utils.service';

export const getServerSideProps = async () => {
    const response = await httpEntry.get('/art/categories')
    const categories = response.data.data
    return { props: { categories } }
}

export default function Upload({ categories }) {

    const mappedCategories = categories.map(category => {
        return { label: `${capitalizeFirst(category.name)}`, value: category.slug }
    })
    
    const [showForm, setShowForm] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [showCancelModal, setShowCancelModal] = useState(false)
    const [specificationValue, setSpecificationValue] = useState("")
    const [specifications, setSpecifications] = useState([])
    const [images, setImages] = useState([])
    
    const specificationsList = specifications.map((specification, index) =>
        <div key={index} className="p-2 rounded-sm mb-2 text-[14px] flex justify-between" style={{ border: '1px dashed #ccc' }}>
            <div><p>{ specification }</p></div>
            <div onClick={() => deleteSpecification(specification)} className="cursor-pointer ml-5">
                <FiXCircle size={22} color="red" />
            </div>
        </div>
    )
    
    const addSpecification = () => {
        if(specificationValue == "") {
            showError("Specification value is required")
        }
        else if (specifications.includes(specificationValue)) {
            showError("Specification value already added")
        }
        else {
            setSpecifications([...specifications, specificationValue])
            setSpecificationValue("")
        }
    }

    const deleteSpecification = (specification) => {
        setSpecifications(
            specifications.filter(spec => spec !== specification)
        )
    }

    const schema = z.object({
        title: z.string().min(1, "Title is required"),
        category: z.string().min(1, "Category is required"),
        description: z.string().min(1, "Description is required"),
        is_signed: z.string().min(1, "Signed status is required")
    })

    const form = useForm({
        validate: zodResolver(schema),
        initialValues: {
            title: "",
            category: "",
            description: "",
            is_signed: ""
        }
    })

    const uploadImages = async (images) => {
        return new Promise(async (resolve, reject) => {
            try {
                const formData = new FormData()
                for(const image of images) {
                    formData.append("image", image)
                }
                const result = await http.post(`/art/upload`, formData)
                resolve(result.data.data.images)
            } catch (error) {
                reject(error)
            }
        })
    }

    const handleSubmit = async (values) => {
        setLoading(true)
        try {
            if(images.length >= 1) {
                const imageUrls = await uploadImages(images)
                const payload = {
                    title: values.title,
                    description: values.description,
                    category_id: values.category,
                    specifications: specifications,
                    is_signed: values.is_signed == "yes",
                    images: imageUrls
                }
                await http.post('/art/add', payload)
                setShowModal(true)
            }
            else showError("You must upload at least one image!")
        } catch (error) {
            showError(error.message)
        }
        finally {
            setLoading(false)
        }
    }

    const previews = images.map((image, index) => {
        const imageUrl = URL.createObjectURL(image)
        return (
            <ManImage
                key={index}
                src={imageUrl}
                imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
                alt=""
                height="100px"
            />
        )
    })

    return (
        <>
            {
                showForm && (
                    <div className="py-4 px-8 sticky top-0 glass-effect z-10">
                        <Button onClick={() => setShowCancelModal(true)} variant="default">Cancel</Button>
                    </div>
                )
            }
            <section className="overflow-y-auto custom-bg">
                <div className="lg:w-[40%] lg:px-0 px-5 w-full mx-auto">
                    {
                        !showForm ? (
                            <>
                                <div className="flex flex-col justify-center items-center h-[100vh]">
                                    <div>
                                        <Image alt="designer image" src={designerImage} />
                                    </div>
                                    <h1 className="text-center">Hey there, what have you been working on?</h1>
                                    <div className="flex justify-center items-center mt-4">
                                        <Button size="md" className="animate-bounce hover:animate-none" onClick={() => setShowForm(true)} rightIcon={<FiArrowRight />}>Let us know</Button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <form className="py-10" onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                                    <h1 className="text-center mb-4">Upload your art!</h1>
                                    <div>
                                        <TextInput
                                            size="md"
                                            label="Title"
                                            withAsterisk
                                            placeholder="What's the title your art?"
                                            {...form.getInputProps('title')}
                                        />
                                    </div>
                                    <div className="mt-6">
                                        <Select
                                            withAsterisk
                                            label="Category"
                                            placeholder="Select art category"
                                            size="md"
                                            data={mappedCategories}
                                            {...form.getInputProps('category')}
                                        />
                                    </div>
                                    <div className="mt-6">
                                        <Textarea
                                            size="md"
                                            label="Description"
                                            withAsterisk
                                            autosize
                                            minRows={6}
                                            placeholder="Tell us a bit about your art!"
                                            {...form.getInputProps('description')}
                                        />
                                    </div>
                                    <div className="mt-6">
                                        <div>
                                            <div>
                                                <Textarea
                                                    label="Specifications"
                                                    description="Facts to know about the art (e.g orientation, dimensions, preservation guides, etc)"
                                                    className="mt-[1px]"
                                                    size="md"
                                                    minRows={3}
                                                    placeholder="Enter specification here..."
                                                    value={specificationValue}
                                                    onChange={(event) => setSpecificationValue(event.currentTarget.value)}
                                                />
                                            </div>
                                            <div className="mt-4">
                                                <Button onClick={addSpecification} rightIcon={<FiPlusCircle />} size="sm">Add</Button>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            { specificationsList }
                                        </div>
                                    </div>
                                    <div className="mt-6">
                                        <Radio.Group
                                            name="favoriteFramework"
                                            label="Is your artwork signed ?"
                                            withAsterisk
                                            size="md"
                                            {...form.getInputProps('is_signed')}
                                            >
                                            <Group mt="xs">
                                                <Radio value="yes" label="Yes" />
                                                <Radio value="no" label="No" />
                                            </Group>
                                        </Radio.Group>
                                    </div>
                                    <div className="mt-6">
                                        <Dropzone
                                            onDrop={(v) => setImages(v)}
                                            maxSize={3 * 1024 ** 2}
                                            accept={IMAGE_MIME_TYPE}
                                            style={{ width: "100%" }}
                                            my="5px"
                                        >
                                            <div className="flex justify-center items-center h-[200px]">
                                                <div>
                                                    <div className="flex justify-center mb-2">
                                                        <FiUploadCloud size={60}/>
                                                    </div>
                                                    <Text align="center" size="xl" inline>
                                                        Drag images here or <span className="text-yellow-500">Browse</span>
                                                    </Text>
                                                    <Text align="center" size="sm" color="dimmed" inline mt={7}>
                                                        Attach as many files as you like, each file should not exceed 5mb
                                                    </Text>
                                                </div>
                                            </div>
                                        </Dropzone>
                                        <div className="grid grid-cols-3 gap-2 mt-4">
                                            { previews }
                                        </div>
                                    </div>
                                    <div className="mt-8">
                                        <Button type="submit" loading={loading} size="md" fullWidth>SUBMIT</Button>
                                    </div>
                                </form>
                                
                                {/* Modals */}

                                <Modal overlayProps={{opacity: 0.55, blur: 3,}} size="sm" opened={showModal} onClose={() => setShowModal(false)} withCloseButton={false} centered>
                                    <div className="flex flex-col justify-center items-center">
                                        <div><BsFillCheckCircleFill color="04C83F" size={70} /></div>
                                        <div className="text-center">
                                            <h2 className="font-bold">Nice job!</h2>
                                            <p>You've successfully shared your art</p>
                                        </div>
                                        <div className="mt-3">
                                            <Button component={Link} href="/gallery" rightIcon={<FiArrowRight/>} size="sm">Finish</Button>
                                        </div>
                                    </div>
                                </Modal>

                                <Modal title="Please confirm action" overlayProps={{opacity: 0.55, blur: 3,}} size="sm" opened={showCancelModal} onClose={() => setShowCancelModal(false)} centered>
                                    <div>
                                        <p>Do you really want to cancel your upload? Doing this would make us sad 😥</p>
                                        <div className="mt-4 flex justify-end">
                                            <Button onClick={() => setShowCancelModal(false)} variant="default" className="mr-2">Cancel</Button>
                                            <Button component={Link} href="/">Confirm</Button>
                                        </div>
                                    </div>
                                </Modal>
                            </>
                        )
                    }
                </div>
            </section>
        </>
    )

}