"use client"

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import BookList from "./BookList";
import { getBookList } from "@/api/getBookList";
import { BookTypes } from "@/types.d";

export default function ListPage() {
    const router = useRouter();
    
    const [word, setWord] = useState<string>("");
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [bookList, setBookList] = useState<BookTypes[]>([]);
    
    useEffect(() => {
        handleScrollDown();
    }, [pageNumber])

    const handleChangeWord = (e: React.ChangeEvent<HTMLInputElement>) => setWord(e.target.value);
    
    const handleSearch = async () => {
        const response = await getBookList(word, pageNumber);
        const { data } = response;
        setBookList(data.books)
    }

    const handleScrollDown = async () => {
        const response = await getBookList(word, pageNumber);
        const { data } = response;
        setBookList(prevBookList => [...prevBookList, ...data.books])
    }
    
    const handleIncreasePageNumber = () => setPageNumber(number => number + 1);

    const handleViewDetail = (isbn13?: string) => {
        router.push(`/detail?isbn13=${isbn13}`)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const isButtonActive = () => word.length > 1 ? true : false;

    return (
        <main className="w-full h-full">
            <div className="flex gap-2 justify-center w-full p-4">
                <input
                    type="text"
                    className="px-2 rounded"
                    value={word}
                    onKeyDown={handleKeyDown}
                    onChange={handleChangeWord}
                />
                <button
                    type="button"
                    className={"border rounded bg-white border-black[0.03] px-3 ".concat(isButtonActive() ? "text-black" : "text-gray-200")}
                    onClick={handleSearch}
                    disabled={!isButtonActive()}
                >
                    검색
                </button>
            </div>

            <BookList
                bookList={bookList}
                onClick={handleViewDetail}
                onChangeScroll={handleIncreasePageNumber}
            />

        </main>
    )
}
