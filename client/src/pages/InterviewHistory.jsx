import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { ServerUrl } from '../App'
import { FaArrowLeft } from 'react-icons/fa'
import { useSelector } from 'react-redux'
function InterviewHistory() {
    const [interviews, setInterviews] = useState([])
    const navigate = useNavigate()
    const { darkMode } = useSelector((state) => state.user)

    useEffect(() => {
        const getMyInterviews = async () => {
            try {
                const result = await axios.get(ServerUrl + "/api/interview/get-interview", { withCredentials: true })

                setInterviews(result.data)

            } catch (error) {
                console.log(error)
            }

        }

        getMyInterviews()

    }, [])


    return (
        <div className={`min-h-screen py-10 ${darkMode ? 'bg-gray-900' : 'bg-linear-to-br from-gray-50 to-emerald-50'}`} >
            <div className='w-[90vw] lg:w-[70vw] max-w-[90%] mx-auto'>

                <div className='mb-10 w-full flex items-start gap-4 flex-wrap'>
                    <button
                        onClick={() => navigate("/")}
                        className={`mt-1 p-3 rounded-full shadow hover:shadow-md transition ${darkMode ? 'bg-gray-800' : 'bg-white'}`}><FaArrowLeft className={darkMode ? 'text-gray-300' : 'text-gray-600'} /></button>

                    <div>
                        <h1 className={`text-3xl font-bold flex-nowrap ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                            Interview History
                        </h1>
                        <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            View past interviews and performance reports.
                        </p>

                    </div>
                </div>


                {interviews.length === 0 ?
                    <div className={`p-10 rounded-2xl shadow text-center ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                        <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                            No interviews found. Start your first interview.
                        </p>

                    </div>

                    :

                    <div className='grid gap-6'>
                        {interviews.map((item, index) => (
                            <div key={index}
                            onClick={()=>navigate(`/report/${item._id}`)}
                             className={`p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border border-gray-100'}`}>
                                <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                                    <div>
                                        <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                                            {item.role}
                                        </h3>

                                        <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                            {item.experience} • {item.mode}
                                        </p>

                                        <p className={`text-xs mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <div className='flex items-center gap-6'>

                                        {/* SCORE */}
                                        <div className="text-right">
                                            <p className="text-xl font-bold text-emerald-600">
                                                {item.finalScore || 0}/10
                                            </p>
                                            <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                                Overall Score
                                            </p>
                                        </div>

                                        {/* STATUS BADGE */}
                                        <span
                                            className={`px-4 py-1 rounded-full text-xs font-medium ${item.status === "completed"
                                                    ? "bg-emerald-100 text-emerald-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                                }`}
                                        >
                                            {item.status}
                                        </span>


                                    </div>
                                </div>

                            </div>

                        ))
                        }

                    </div>
                }
            </div>

        </div>
    )
}

export default InterviewHistory

