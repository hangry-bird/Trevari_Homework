import React from 'react';
import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react';
import BookList, { BookItem } from './BookList';
import 'intersection-observer';


describe('<BookItem />', () => {
    it('isbn13 key', () => {
        const { queryByText } =render(
            <BookItem
                isbn13="123456789"
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEoaxgEJ4WCLgCLl7gR6dW0wBPxoTnCtXevA&usqp=CAU"
                subtitle="Sub Title"
                title="Main Title"
                url="https://www.naver.com"
            />
        );
        expect(queryByText("123456789")).not.toBeInTheDocument();
    });

    it('main title render test', () => {
        const { container, getByText } = render(
            <BookItem
                isbn13="123456789"
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEoaxgEJ4WCLgCLl7gR6dW0wBPxoTnCtXevA&usqp=CAU"
                subtitle="Sub Title"
                title="Main Title"
                url="https://www.naver.com"
            />
        );
        const headerTitle = container.querySelector('h3');
        expect(headerTitle).toBeInTheDocument()
        expect(getByText("Main Title")).toBeInTheDocument();

    });

    it('sub title render test', () => {
        const { container, getByText } = render(
            <BookItem
                isbn13="123456789"
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEoaxgEJ4WCLgCLl7gR6dW0wBPxoTnCtXevA&usqp=CAU"
                subtitle="Sub Title"
                title="Main Title"
                url="https://www.naver.com"
            />
        );
        const spanSubTitle = container.querySelector('span');
        expect(spanSubTitle).toBeInTheDocument()
        expect(getByText("Sub Title")).toBeInTheDocument();
    });

    it('image render test', () => {
        render(
            <BookItem
                isbn13="123456789"
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEoaxgEJ4WCLgCLl7gR6dW0wBPxoTnCtXevA&usqp=CAU"
                subtitle="Sub Title"
                title="Main Title"
                url="https://www.naver.com"
            />
        );
        const displayedImage = document.querySelector("img") as HTMLImageElement;
        expect(displayedImage.src).toContain("ANd9GcQEoaxgEJ4WCLgCLl7gR6dW0wBPxoTnCtXevA");
    });

    it('url link render test', () => {
        const { getByRole } =render(
            <BookItem
                isbn13="123456789"
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEoaxgEJ4WCLgCLl7gR6dW0wBPxoTnCtXevA&usqp=CAU"
                subtitle="Sub Title"
                title="Main Title"
                url="https://www.naver.com"
            />
        );
        expect(getByRole('link')).toHaveAttribute('href', 'https://www.naver.com')
    });

    it('button onClick test', () => {
        const onClickHandler = jest.fn();

        const { getByRole } = render(
            <BookItem
                isbn13="123456789"
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEoaxgEJ4WCLgCLl7gR6dW0wBPxoTnCtXevA&usqp=CAU"
                subtitle="Sub Title"
                title="Main Title"
                url="https://www.naver.com"
                onClick={onClickHandler}
            />
        );
        const button = getByRole('button');
        expect(getByRole('button')).toBeInTheDocument();

        fireEvent.click(button);
        expect(onClickHandler).toBeCalledTimes(1);
    });
});

const exampleBookList = [
    {
        title: "A title",
        subtitle: "B sub title",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEoaxgEJ4WCLgCLl7gR6dW0wBPxoTnCtXevA&usqp=CAU",
        url: "https://www.naver.com"
    },
    {
        title: "B title",
        subtitle: "B sub title",
        image: "https://itbook.store/books/9781430246176",
        url: "https://www.daum.net"
    },
]

describe('<BookList />', () => {
    it('BookItem render count', () => {
        const { getAllByRole } = render(
            <BookList
                bookList={exampleBookList}
                onClick={() => {}}
                onChangeScroll={() => {}}
            />
        );

        const articles = getAllByRole('article');
        const articleCount = articles.length;
      
        expect(articleCount).toBe(2);
    });
});
