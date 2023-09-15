"use client"

import React, { useState } from "react";
import { useRouter } from 'next/navigation'
import BookList from "./BookList";
import { getBookList } from "@/api/getBookList";
import { BookTypes } from "@/types.d";

export default function ListPage() {
    const router = useRouter();

    const [word, setWord] = useState<string>("");
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [bookList, setBookList] = useState<BookTypes[]>([]);

    const handleChangeWord = (e: React.ChangeEvent<HTMLInputElement>) => setWord(e.target.value);

    const handleSearch = async (pageNum: number) => {
        const removeKeywordIndex = extractRemoveKeywordIndex(word);
        const apiSearchWord = getSubstringFromIndex(word, removeKeywordIndex);

        const response = await getBookList(apiSearchWord, pageNum);
        const { data } = response;
        const fetchBookList = data.books;


        function filterBooksByKeyword () {
            // 제외 키워드(-) 없을 시
            if(removeKeywordIndex < 0){
                return fetchBookList;
            }

            const removeKeyword = extractRemoveKeyword(word, removeKeywordIndex + 1)
            return removeArrayInSpecificKeyword(fetchBookList, removeKeyword);
        }

        const filteredBookList = filterBooksByKeyword();

        const isScrollDown = pageNum !== 1;
        setBookList(prevBookList => isScrollDown ? [...prevBookList, ...filteredBookList] : filteredBookList);
    }

    const handleSearchButton = () => {
        setPageNumber(number => {
            const initPageNumber = 1;
            handleSearch(initPageNumber);
            return initPageNumber;
        });
    }

    const handleScrollDown = () => {
        setPageNumber(number => {
            const nextPageNumber = number + 1;
            handleSearch(nextPageNumber);
            return nextPageNumber;
        });
    }

    const handleViewDetail = (isbn13?: string) => {
        router.push(`/detail?isbn13=${isbn13}`)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (isButtonActive() && e.key === 'Enter') {
            handleSearchButton();
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
                    onClick={() => handleSearchButton()}
                    disabled={!isButtonActive()}
                >
                    검색
                </button>
            </div>

            <BookList
                bookList={bookList}
                onClick={handleViewDetail}
                onChangeScroll={handleScrollDown}
            />

        </main>
    )
}

const getSubstringFromIndex = (keyword: string, index: number): string => {
    return index >= 0 ? keyword.substring(0, index) : keyword
}

const removeArrayInSpecificKeyword = (arr: BookTypes[], keyword: string) => {
    return arr.filter(book => book.title.toLowerCase().indexOf(keyword) < 0);
}

const extractRemoveKeywordIndex = (keyword: string) => keyword.indexOf('-');

const extractRemoveKeyword = (keyword: string, startIndex: number) => {
    return keyword.substring(startIndex, keyword.length);
}