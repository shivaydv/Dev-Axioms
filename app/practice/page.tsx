'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Clock, Code, Play } from 'lucide-react';
import questionsData from '@/data/practice-questions.json';

interface Question {
    id: string;
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    category: string;
    timeLimit: number;
    description: string;
    requirements: string[];
}

const difficultyColors = {
    Easy: 'bg-green-100 text-green-800 border-green-200',
    Medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    Hard: 'bg-red-100 text-red-800 border-red-200',
};

const difficultyDots = {
    Easy: 'bg-green-500',
    Medium: 'bg-yellow-500',
    Hard: 'bg-red-500',
};

export default function PracticePage() {

    const questions = questionsData.questions as Question[];


    return (
        <div className="min-h-screen ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold  mb-4">
                        Coding Practice
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Sharpen your coding skills with our curated collection of interview-style questions.
                        Practice with real-time feedback and time tracking.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className=" p-6 rounded-lg shadow-md border ">
                        <div className="flex items-center">
                            <Code className="w-8 h-8 text-blue-600 mr-3" />
                            <div>
                                <p className="text-2xl font-bold ">{questions.length}</p>
                                <p className="text-muted-foreground">Total Questions</p>
                            </div>
                        </div>
                    </div>
                    <div className=" p-6 rounded-lg shadow-md border ">
                        <div className="flex items-center">
                            <div className="w-8 h-8 mr-3 flex items-center justify-center">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-green-600">
                                    {questions.filter(q => q.difficulty === 'Easy').length}
                                </p>
                                <p className="text-muted-foreground">Easy</p>
                            </div>
                        </div>
                    </div>
                    <div className=" p-6 rounded-lg shadow-md border ">
                        <div className="flex items-center">
                            <div className="w-8 h-8 mr-3 flex items-center justify-center">
                                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-yellow-600">
                                    {questions.filter(q => q.difficulty === 'Medium').length}
                                </p>
                                <p className="text-muted-foreground">Medium</p>
                            </div>
                        </div>
                    </div>
                    <div className=" p-6 rounded-lg shadow-md border ">
                        <div className="flex items-center">
                            <div className="w-8 h-8 mr-3 flex items-center justify-center">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-red-600">
                                    {questions.filter(q => q.difficulty === 'Hard').length}
                                </p>
                                <p className="text-muted-foreground">Hard</p>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Questions Table */}
                <div className=" rounded-lg shadow-md border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-muted">
                            <thead className="">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                        Question
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                        Category
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                        Difficulty
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                        Time Limit
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className=" divide-y divide-muted">
                                {questions.map((question) => (
                                    <tr key={question.id} className=" transition-colors">
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="text-sm font-medium  mb-1">
                                                    {question.title}
                                                </div>
                                                <div className="text-sm text-muted-foreground line-clamp-2">
                                                    {question.description}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {question.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${difficultyColors[question.difficulty]}`}>
                                                <div className={`w-2 h-2 rounded-full mr-1.5 ${difficultyDots[question.difficulty]}`}></div>
                                                {question.difficulty}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center text-sm ">
                                                <Clock className="w-4 h-4 mr-1 text-muted-foreground" />
                                                {question.timeLimit} min
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Link href={`/practice/${question.id}`}>
                                                <Button className="bg-blue-600 hover:bg-blue-700">
                                                    <Play className="w-4 h-4 mr-1" />
                                                    Start
                                                </Button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
