import {useState} from "react";

export const HistoryManager = () => {
    const [history, setHistory] = useState<string[]>([]);
    const [forwardStack, setForwardStack] = useState<string[]>([]);

    const navigateToPage = (pageName: string, navigation: any) => {
        setHistory((prev) => [...prev,pageName]);
        setForwardStack([]);
        navigation.navigate(pageName);
    };

    const handleBack = (navigation: any) => {
        if (history.length > 1) {
            const prevPage = history[history.length - 2];
            setForwardStack((prev) => [history[history.length - 1], ...prev]);
            setHistory((prev) => prev.slice(0,-1));
            navigation.navigate(prevPage);
        }
    };

    const handleForward = (navigation: any) => {
        if (forwardStack.length > 0){
            const nextPage = forwardStack[forwardStack.length -1];
            setForwardStack((prev) => prev.slice(0,-1));
            setHistory((prev) => [...prev, nextPage]);
            navigation.navigate(nextPage);
        }
    };

    return {navigateToPage, handleBack, handleForward};
}