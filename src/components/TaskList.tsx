import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaCheckCircle, FaHourglassHalf, FaClipboardList } from "react-icons/fa";

interface Task {
    _id: string; // Unique identifier for the task
    mealBox: string; // e.g., "Morning", "Evening", "Night"
    preparationStatus: string; // e.g., "Pending", "In Progress", "Completed"
    assignedTo: string; // Name of the assigned staff member
}

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    // Fetch tasks from the pantry API
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get("/api/pantry"); // Correct API endpoint
                // Flatten the response to extract tasks and their assigned staff
                const pantryTasks = response.data.flatMap((staff: any) =>
                    staff.assignedTasks.map((task: any) => ({
                        _id: task._id,
                        mealBox: task.mealBox,
                        preparationStatus: task.preparationStatus,
                        assignedTo: staff.staffName, // Linking task to the staff member
                    }))
                );
                setTasks(pantryTasks);
            } catch (error: any) {
                const errorMessage =
                    error.response?.data?.message || "Failed to fetch tasks.";
                toast.error(errorMessage);
            }
        };

        fetchTasks();
    }, []);

    // Update the status of a task
    const updateTaskStatus = async (taskId: string, newStatus: string) => {
        try {
            const response = await axios.patch(`/api/pantry`, { taskId, newStatus });
            const updatedTask: Task = response.data;

            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task._id === taskId
                        ? { ...task, preparationStatus: updatedTask.preparationStatus }
                        : task
                )
            );

            toast.success("Task status updated.");
        } catch (error: any) {
            const errorMessage =
                error.response?.data?.message || "Failed to update task status.";
            toast.error(errorMessage);
        }
    };

    return (
        <div>
            <h3 className="text-xl font-semibold mb-4">Food Preparation Tasks</h3>
            <ul>
                {tasks.map((task) => (
                    <li
                        key={task._id}
                        className="flex justify-between items-center p-4 bg-white shadow-md mb-2 rounded-lg"
                    >
                        <div>
                            <p className="font-semibold flex items-center space-x-2">
                                <FaClipboardList className="text-blue-500" />
                                <span>Meal Box: {task.mealBox}</span>
                            </p>
                            <p>Assigned To: {task.assignedTo}</p>
                            <p>Status: {task.preparationStatus}</p>
                        </div>
                        <div className="flex space-x-4">
                            {task.preparationStatus !== "Completed" && (
                                <button
                                    onClick={() => updateTaskStatus(task._id, "Completed")}
                                    className="text-green-500 flex items-center space-x-2"
                                >
                                    <FaCheckCircle /> <span>Complete</span>
                                </button>
                            )}
                            {task.preparationStatus !== "In Progress" && (
                                <button
                                    onClick={() => updateTaskStatus(task._id, "In Progress")}
                                    className="text-yellow-500 flex items-center space-x-2"
                                >
                                    <FaHourglassHalf /> <span>In Progress</span>
                                </button>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
