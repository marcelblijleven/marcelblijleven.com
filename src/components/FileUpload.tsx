"use client"

import {ChangeEvent, createRef, useCallback, useState} from "react";
import Button from "@/components/Button";

interface Props {
    callback: (data: string) => void;
}

export default function FileUpload(props: Props) {
    const [file, setFile] = useState<File>();
    const ref = createRef<HTMLInputElement>();

    const onSelectFileClick = useCallback(() => {
        ref?.current && ref.current.click();
    }, [ref]);

    const onFileChange = (event: ChangeEvent<HTMLInputElement>) => setFile(event.target.files?.[0]);

    const onProcess = () => {
        if (!file) return;
        const reader = new FileReader();

        reader.onloadend = (e: ProgressEvent<FileReader>) => {
            if (typeof e.target?.result === "string") {
                props.callback(e.target.result);
            }
        }

        reader.readAsText(file, "utf-8");
    }

    return (
        <div className={"flex gap-2 items-center"}>
            <input
                hidden
                ref={ref}
                id={"file-upload"}
                type={"file"}
                accept={"application/json"}
                onChange={onFileChange}
            />
            <Button label={"Select file"} variant={"secondary"} onClick={onSelectFileClick} />
            <Button label={"Process"} onClick={onProcess} disabled={!file} />
            {file && <p>{file.name}</p>}
        </div>
    );
}

