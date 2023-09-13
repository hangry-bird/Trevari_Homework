"use client"

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ListPage() {
    const [word, setWord] = useState<string>("");

    const handleChangeWord = (e: React.ChangeEvent<HTMLInputElement>) => setWord(e.target.value);

    const handleSearch = () => {
        console.log("word: ", word)
    }

    const handleViewDetail = (isbn13?: string) => {
        console.log(isbn13)
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

            <section className="flex flex-wrap justify-center content-start gap-2 w-full h-full">
                <article>
                    <div className="flex flex-col items-center border border-gray-700">
                        <button
                            type="button"
                            onClick={() => handleViewDetail("123-123")}
                        >
                            <h3>{"Title"}</h3>
                            <span className="text-gray-400 text-xs">Sub Title</span>
                            <Image
                                src={"https://itbook.store/img/books/9780321704214.png"}
                                width={"128"}
                                height={"128"}
                                alt=""
                                unoptimized={true}
                            />
                        </button>
                        <Link
                            target="_blank"
                            href="https://itbook.store/books/9780321704214"
                        >
                            URL
                        </Link>
                    </div>
                </article>

            </section>
        </main>
    )
}
