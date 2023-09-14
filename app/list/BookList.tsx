"use client";

import Link from "next/link";
import Image from "next/image";
import { BookTypes } from "@/types.d";


interface BookListProps {
    bookList: BookTypes[];
    onClick: () => void;
}
export default function BookList({
    bookList = [],
    onClick = () => { }
}: BookListProps) {
    return (
        <section className="flex flex-wrap justify-center content-start gap-2 w-full h-full">
            {
                bookList?.map((book: BookTypes) => {
                    const {
                        image,
                        isbn13,
                        price,
                        subtitle,
                        title,
                        url
                    } = book;
                    return (
                        <article key={isbn13}>
                            <div className="flex flex-col justify-between min-w-[200px] max-w-[200px] min-h-[360px] max-h-[360px] items-center border border-gray-700">
                                <button
                                    type="button"
                                    onClick={() => onClick()}
                                    className="h-screen flex flex-col justify-between"
                                >
                                    <div>
                                        <h3>{title}</h3>
                                        <span className="text-gray-400 text-xs">{subtitle}</span>
                                    </div>
                                    <Image
                                        src={image}
                                        className="mx-auto"
                                        width={"128"}
                                        height={"128"}
                                        alt=""
                                        unoptimized={true}
                                    />
                                </button>
                                <Link
                                    target="_blank"
                                    href={url}
                                >
                                    URL
                                </Link>
                            </div>
                        </article>
                    )
                })
            }
        </section>
    );
}
