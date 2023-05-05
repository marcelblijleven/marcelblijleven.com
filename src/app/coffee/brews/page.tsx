"use client"

import {readBrewData} from "@/lib/brew_data";
import {Brew} from "@/types/coffee/brews";
import Table from "@/app/coffee/brews/Table";
import Pagination, {paginate} from "@/components/Pagination";
import {useCallback, useState} from "react";
import Container from "@/components/Container";
import Header from "@/components/Header";
import Intro from "@/app/Intro";

export default function Page() {
    const pageSize = 20;
    const brews = readBrewData();
    const [currentPage, setCurrentPage] = useState(1);
    const onPageChange = useCallback((page: number) => {
        setCurrentPage(page);
    }, [])

    const paginatedBrews = paginate<Brew>(brews, currentPage, pageSize);

    return (
        <>
            <Header />
            <Container>
                <Intro title={"Brews"} description={"What I've been drinking lately"}/>
                <Table brews={paginatedBrews} />
                <Pagination total={brews.length} pageSize={20} currentPage={currentPage} onPageChange={onPageChange} />
            </Container>
        </>
    )
}
