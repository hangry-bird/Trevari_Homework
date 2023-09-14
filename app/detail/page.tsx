"use client"

import React, { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation'
import Image from "next/image";
import { getBookDetails } from "@/api/getBookDetails";
import { BookDetailTypes } from "@/types.d";

export default function DetailPage() {
    const searchParams = useSearchParams()
    const isbn13 = searchParams.get('isbn13')

    const [bookDetails, setBookDetails] = useState<BookDetailTypes>({
        title: "",
        subtitle: "",
        authors: "",
        desc: "",
        image: "",
        pages: "",
        price: "",
        publisher: "",
        rating: ""
    });

    useEffect(() => {
        if(isbn13){
            handleFetchBookDetail(isbn13);
        }
    }, [isbn13])

    const handleFetchBookDetail = async (isbn13: string) => {
        const response = await getBookDetails(isbn13);
        const { data } = response;
        setBookDetails(data)
    }


    return (
        <main className="w-full h-full">
            <div className="flex flex-col items-center p-9">

                --------------------
                <h2>{bookDetails?.title}</h2>
                <span className="text-gray-400 text-xs">{bookDetails?.subtitle}</span>
                --------------------
                <span className="text-gray-600 text-lg">{bookDetails.authors}</span>
                --------------------
                <span className="text-gray-600 text-lg">{bookDetails.publisher}</span>
                --------------------
                <p className="text-gray-400 text-xs">{bookDetails.desc}</p>
                --------------------
                <Image
                    src={bookDetails.image}
                    className="mx-auto w-24 h-32"
                    width={"96"}
                    height={"128"}
                    alt=""
                    unoptimized={true}
                />
                <span>{bookDetails.price}</span>
                --------------------
                <span>{bookDetails.pages}</span>
                --------------------
                <span>{bookDetails.rating}</span>

            </div>

        </main>
    )
}
