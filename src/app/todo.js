import React from "react";
import { Flex, Text, Input, Button, Select, ChevronDownIcon, DeleteIcon, Pressable, InfoIcon, Modal } from "native-base";
import API from "../service/api";
import Lottie from "react-lottie";
import * as animationData from '../assets/animations/noData.json';

export const ToDo = () => {

    const [priority, setPriority] = React.useState("low");
    const [taskName, setTaskName] = React.useState("");
    const [taskList, setTaskList] = React.useState([]);
    const [noData, setNoData] = React.useState(null);
    const [showEditMenu, setShowEditMenu] = React.useState(false);
    const [editedTask, setEditedTask] = React.useState("");
    const [editedPriority, setEditedPriority] = React.useState("low");
    const [editId, setEditId] = React.useState("");

    React.useEffect(() => {
        getTasks()
    }, [])

    async function getTasks() {

        setTaskList([])

        let header = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }

        await API.getTasks(header)
            .then(response => response.json())
            .then(res => {
                console.log("Get Task API response", res)
                if (res.length < 1) {
                    setNoData(true)
                }
                else {
                    setNoData(false)
                }
                setTaskList(res)
            })
            .catch(err => {
                console.error("Error in API call", err)
            })
    }

    async function addTask() {

        let header = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }

        let reqBody = {
            "task": taskName,
            "priority": priority
        }

        await API.addTask(header, reqBody)
            .then(response => response.text())
            .then(res => {
                console.log("Add Task API response", res)
                setTaskName("")
                getTasks()
            })
            .catch(err => {
                console.error("Error in API call", err)
            })
    }

    async function removeTask(id) {

        let header = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }

        await API.removeTask(header, id)
            .then(response => response.text())
            .then(res => {
                console.log("Remove Task API response", res)
                getTasks()
            })
            .catch(err => {
                console.error("Error in API call", err)
            })
    }

    async function updateTask() {

        let header = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }

        let reqBody = {
            "task": editedTask,
            "priority": editedPriority
        }

        await API.updateTask(header, reqBody, editId)
            .then(response => response.text())
            .then(res => {
                console.log("Update Task API response", res)
                setEditedTask("")
                setEditedPriority("low")
                setEditId("")
                getTasks()
            })
            .catch(err => {
                console.error("Error in API call", err)
            })
    }

    const animationOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <Flex width={"100%"} height={"100%"} alignItems={"center"} padding={"20px"} flex={1} >

            <Text fontSize={{ base: "22px", sm: "22px", md: "30px", lg: "32px", xl: "34px" }} fontWeight={"bold"} >To-Do App</Text>

            <Flex marginTop={"25px"} width={{ base: "90%", sm: "90%", md: "60%", lg: "50%", xl: "50%" }} flexDirection={"row"} justifyContent={"space-between"} >
                <Input placeholder="Add task" value={taskName} onChangeText={(val) => setTaskName(val)} fontSize={"18px"} width="60%" height={"60px"} />

                <Flex width={"19%"} >
                    <Select selectedValue={priority} onValueChange={(val) => setPriority(val)} variant="outline" height={"60px"} dropdownIcon={<Flex marginRight={"5px"} ><ChevronDownIcon /></Flex>} >
                        <Select.Item label="Low" value="low" />
                        <Select.Item label="Medium" value="medium" />
                        <Select.Item label="High" value="high" />
                    </Select>
                </Flex>

                <Button width={"20%"} onPress={() => taskName !== "" ? addTask() : null} opacity={taskName !== "" ? 1 : 0.4} >
                    <Text fontSize={"18px"} fontWeight={"bold"} color={"#fff"} >Add</Text>
                </Button>
            </Flex>

            {noData === false ?
                <Flex width={{ base: "90%", sm: "90%", md: "60%", lg: "50%", xl: "50%" }} marginTop={"40px"} >

                    {taskList.find(item => item.priority === "high") ? <Text fontSize={{ base: "14px", sm: "14px", md: "14px", lg: "16px", xl: "18px" }} fontWeight={"medium"} color={"#14b8a6"} marginBottom={"10px"} marginTop={"10px"}>High</Text> : null}

                    {
                        taskList.map((item, index) => (
                            item.priority === "high" ?
                                <Flex key={index} paddingX={"20px"} height={"80px"} borderWidth={1} borderColor={"#a8a29e"} borderRadius={"8px"} flexDirection="row" justifyContent="space-between" alignItems="center" marginBottom={"8px"} >
                                    <Flex width={{ base: "80%", sm: "80%", md: "90%", lg: "90%", xl: "90%" }}  >
                                        <Text fontSize={{ base: "16px", sm: "16px", md: "22px", lg: "24px", xl: "26px" }} fontWeight={"thin"} color={"#0f766e"}>{item.task}</Text>
                                    </Flex>

                                    <Flex width={{ base: "20%", sm: "20%", md: "10%", lg: "10%", xl: "10%" }} flexDirection={"row"} justifyContent={"space-between"} >
                                        <Pressable onPress={() => { setShowEditMenu(true); setEditId(item.id) }}  >
                                            <InfoIcon size={6} color={"#0f766e"} />
                                        </Pressable>
                                        <Pressable onPress={() => removeTask(item.id)} >
                                            <DeleteIcon size={6} color={"#0f766e"} />
                                        </Pressable>
                                    </Flex>
                                </Flex>
                                : null
                        ))
                    }

                    {taskList.find(item => item.priority === "medium") ? <Text fontSize={{ base: "14px", sm: "14px", md: "14px", lg: "16px", xl: "18px" }} fontWeight={"medium"} color={"#14b8a6"} marginBottom={"10px"} marginTop={"10px"} >Medium</Text> : null}

                    {
                        taskList.map((item, index) => (
                            item.priority === "medium" ?
                                <Flex key={index} paddingX={"20px"} height={"80px"} borderWidth={1} borderColor={"#a8a29e"} borderRadius={"8px"} flexDirection="row" justifyContent="space-between" alignItems="center" marginBottom={"8px"} >
                                    <Flex width={{ base: "80%", sm: "80%", md: "90%", lg: "90%", xl: "90%" }}  >
                                        <Text fontSize={{ base: "16px", sm: "16px", md: "22px", lg: "24px", xl: "26px" }} fontWeight={"thin"} color={"#0f766e"}>{item.task}</Text>
                                    </Flex>

                                    <Flex width={{ base: "20%", sm: "20%", md: "10%", lg: "10%", xl: "10%" }} flexDirection={"row"} justifyContent={"space-between"} >
                                        <Pressable onPress={() => { setShowEditMenu(true); setEditId(item.id) }}  >
                                            <InfoIcon size={6} color={"#0f766e"} />
                                        </Pressable>
                                        <Pressable onPress={() => removeTask(item.id)} >
                                            <DeleteIcon size={6} color={"#0f766e"} />
                                        </Pressable>
                                    </Flex>
                                </Flex>
                                : null
                        ))
                    }

                    {taskList.find(item => item.priority === "low") ? <Text fontSize={{ base: "14px", sm: "14px", md: "14px", lg: "16px", xl: "18px" }} fontWeight={"medium"} color={"#14b8a6"} marginBottom={"10px"} marginTop={"10px"} >Low</Text> : null}

                    {
                        taskList.map((item, index) => (
                            item.priority === "low" ?
                                <Flex key={index} paddingX={"20px"} height={"80px"} borderWidth={1} borderColor={"#a8a29e"} borderRadius={"8px"} flexDirection="row" justifyContent="space-between" alignItems="center" marginBottom={"8px"} >
                                    <Flex width={{ base: "80%", sm: "80%", md: "90%", lg: "90%", xl: "90%" }}  >
                                        <Text fontSize={{ base: "16px", sm: "16px", md: "22px", lg: "24px", xl: "26px" }} fontWeight={"thin"} color={"#0f766e"}>{item.task}</Text>
                                    </Flex>

                                    <Flex width={{ base: "20%", sm: "20%", md: "10%", lg: "10%", xl: "10%" }} flexDirection={"row"} justifyContent={"space-between"} >
                                        <Pressable onPress={() => { setShowEditMenu(true); setEditId(item.id) }} >
                                            <InfoIcon size={6} color={"#0f766e"} />
                                        </Pressable>
                                        <Pressable onPress={() => removeTask(item.id)} >
                                            <DeleteIcon size={6} color={"#0f766e"} />
                                        </Pressable>
                                    </Flex>
                                </Flex>
                                : null
                        ))
                    }

                </Flex>
                :
                <Flex>
                    <Lottie options={animationOptions}
                        height={400}
                        width={400} />
                    <Text fontSize={{ base: "22px", sm: "22px", md: "30px", lg: "32px", xl: "34px" }} fontWeight={"bold"} color={"#0f766e"} textAlign={"center"} marginTop={"-40px"} >No Data</Text>
                </Flex>
            }

            <Modal isOpen={showEditMenu} onClose={() => setShowEditMenu(false)} width={"100%"} height={"100%"} >
                <Modal.Content>

                    <Modal.CloseButton />
                    <Modal.Header><Text color={"#0f766e"} fontSize={{ base: "22px", sm: "22px", md: "30px", lg: "32px", xl: "34px" }}  >Edit Task</Text></Modal.Header>
                    <Modal.Body>

                        <Text fontSize={{ base: "14px", sm: "14px", md: "14px", lg: "16px", xl: "18px" }} fontWeight={"medium"} color={"#14b8a6"} marginBottom={"10px"} marginTop={"10px"}>Task</Text>
                        <Input value={editedTask} onChangeText={(val) => setEditedTask(val)} height={"40px"} />

                        <Text fontSize={{ base: "14px", sm: "14px", md: "14px", lg: "16px", xl: "18px" }} fontWeight={"medium"} color={"#14b8a6"} marginBottom={"10px"} marginTop={"10px"}>Priority</Text>
                        <Select selectedValue={editedPriority} onValueChange={(val) => setEditedPriority(val)} variant="outline" height={"40px"} dropdownIcon={<Flex marginRight={"5px"} ><ChevronDownIcon /></Flex>} >
                            <Select.Item label="Low" value="low" />
                            <Select.Item label="Medium" value="medium" />
                            <Select.Item label="High" value="high" />
                        </Select>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group space={2}>
                            <Button variant="ghost" colorScheme="blueGray" onPress={() => { setShowEditMenu(false); setEditedTask(""); setEditId("") }}>
                                Cancel
                            </Button>
                            <Button onPress={() => { setShowEditMenu(false); updateTask() }}>
                                Save
                            </Button>
                        </Button.Group>
                    </Modal.Footer>

                </Modal.Content>
            </Modal>

        </Flex>
    )
}