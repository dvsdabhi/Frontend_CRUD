import React from "react";
import { useState } from "react";
import axios from 'axios';

const Read = () => {
    const [user, setUser] = useState([]);
    const [setId, setNewId] = useState(31);
    const [editingUser, setEditingUser] = useState(null);

    // let new_id = 31
    const [formData, setFormData] = useState({
        id: setId,
        firstName: "",
        lastName: "",
        age: "",
        gender: ""
    });

    const get_data = async () => {
        const res = await axios.get(`https://dummyjson.com/users`);
        setUser(res.data.users);
        console.log(res);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }
    console.log(formData);

    const Add_data = async (e) => {
        e.preventDefault();
        try {
            const updatedFormData = { ...formData, id: setId }
            const res = await axios.post(`https://dummyjson.com/users/add`, updatedFormData);
            console.log(res);
            if (res.status === 200) {
                await get_data();
                const newUser = [...user, updatedFormData];
                setUser(newUser);
                setNewId(setId + 1);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const Delete_data = async (id) => {
        console.log(id);
        const res = await axios.delete(`https://dummyjson.com/users/${id}`);
        if (res.status === 200) {
            const updated_data = user.filter((user) => user.id !== id);
            setUser(updated_data);
        }
    }

    const editUser = async (user) => {
        setEditingUser(user);
        setFormData({ firstName: user.firstName, lastName: user.lastName, age: user.age, gender: user.gender })
    }

    const update_data = async (e) => {
        e.preventDefault();
        const res = await axios.put(`https://dummyjson.com/users/${editingUser.id}`, formData);
        if (res.status === 200) {
            await get_data();
            setEditingUser(null);
            const a = [...user,res.data]
            setFormData({
                id: 101,
                firstName: "",
                lastName: "",
                age: "",
                gender: ""
            });
            setUser(a);
            console.log("User updated successfully!", res);

        } else {
            console.error("Failed to update user");
        }
        console.log(res);
    }

    return (
        <>
            <div className="grid grid-flow-col col-span-2">
                <div className="flex flex-col items-center space-y-5">
                    <div className="flex space-x-5">
                        <button onClick={get_data} className="border-2 rounded-lg p-2 bg-blue-400">Show Data</button>
                        <button className="border-2 rounded-lg p-2 bg-gray-400">Update Data</button>
                        <button className="border-2 rounded-lg p-2 bg-green-500">Add Data</button>
                    </div>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>firstName</th>
                                    <th>lastName</th>
                                    <th>age</th>
                                    <th>Gender</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {user.map((user) => (
                                    <tr>
                                        <td>{user.id}</td>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.age}</td>
                                        <td>{user.gender}</td>
                                        <td><button onClick={() => editUser(user)} className="border-2 p-2 rounded-lg">Update</button></td>
                                        <td><button onClick={() => Delete_data(user.id)} className="border-2 p-2 rounded-lg">Delete</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="flex flex-col items-center my-10">
                    <div className="space-y-5 w-full">
                        <h1 className="bg-gray-400 rounded-lg p-2 text-center">Add New User</h1>
                        <form action="" onSubmit={editingUser ? update_data : Add_data} className="flex flex-col space-y-5">
                            <input onChange={handleChange} type="text" name="firstName" value={formData.firstName} className="border-2 p-2 border-gray-400 rounded-lg" placeholder="Enter firstName" />
                            <input onChange={handleChange} type="text" name="lastName" value={formData.lastName} className="border-2 p-2 border-gray-400 rounded-lg" placeholder="Enter lastName" />
                            <input onChange={handleChange} type="text" name="age" value={formData.age} className="border-2 p-2 border-gray-400 rounded-lg" placeholder="Enter age" />
                            <input onChange={handleChange} type="text" name="gender" value={formData.gender} className="border-2 p-2 border-gray-400 rounded-lg" placeholder="Enter gender" />
                            <button className="border-2 p-2 border-gray-400 rounded-lg">Add</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Read;