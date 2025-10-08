import { useState } from "react";

export const useDashboard= (page : string) =>{
    const [currentPage, setCurrentPage] = useState(page);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return {currentPage,setCurrentPage,isMenuOpen,setIsMenuOpen}
}
