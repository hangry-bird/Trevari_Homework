"use client";

import Link from "next/link";
import Image from "next/image";
import { useInView } from "react-intersection-observer"
import React, { useEffect } from "react";
import { BookTypes } from "@/types.d";


interface BookListProps {
    bookList: BookTypes[];
    onClick: () => void;
    onChangeScroll?: () => void;
}
export default function BookList({
    bookList = [],
    onClick = () => { },
    onChangeScroll = () => { }
}: BookListProps) {
    const [ref, inView] = useInView()

    useEffect(() => {
        if (inView) {
            onChangeScroll();
        }
    }, [inView])

    return (
        <section className="flex flex-wrap justify-center content-start gap-2 w-full h-full">
            {
                bookList?.map((book: BookTypes, index: number) => {
                    const {
                        image,
                        isbn13,
                        price,
                        subtitle,
                        title,
                        url
                    } = book;

                    const isLast = bookList.length - 1 === index;

                    if (isLast) {
                        return (
                            <article key={isbn13} ref={ref}>
                                <BookItem
                                    image={image}
                                    price={price}
                                    subtitle={subtitle}
                                    title={title}
                                    url={url}
                                    onClick={onClick}
                                />
                            </article>
                        )
                    }

                    return (
                        <article key={isbn13}>
                            <BookItem
                                image={image}
                                price={price}
                                subtitle={subtitle}
                                title={title}
                                url={url}
                                onClick={onClick}
                            />
                        </article>
                    )
                })
            }
        </section>
    );
}


interface BookItemProps extends BookTypes {
    onClick?: () => void;
}
const BookItem = ({
    image = "",
    subtitle = "",
    title = "",
    url = "",
    onClick = () => { }
}: BookItemProps) => {
    return (
        <div className="flex flex-col justify-between min-w-[200px] max-w-[200px] min-h-[360px] max-h-[360px] items-center border border-gray-700">
            <button
                type="button"
                onClick={() => onClick()}
                className="h-screen flex flex-col justify-between"
            >
                <HeaderTitle
                    title={title}
                    subtitle={subtitle}
                />

                <Image
                    src={image}
                    className="mx-auto w-24 h-32"
                    width={"96"}
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
    )
}

interface HeaderTitleProps {
    title: string;
    subtitle: string
}
const HeaderTitle = ({
    title = "",
    subtitle = ""
}: HeaderTitleProps) => {
    return (
        <div>
            <h3>{title}</h3>
            <span className="text-gray-400 text-xs">{subtitle}</span>
        </div>
    )
}