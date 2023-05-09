import {BrewStatistics, processBCFile} from "@/lib/brew_statistics";
import FileUpload from "@/components/FileUpload";

interface Props {
    callback: (data: BrewStatistics) => void;
}



export default function UploadSection(props: Props) {
    return (
        <div>
            <h2 className={"text-xl font-semibold mb-2"}>Select file to process</h2>
            <p className={"text-gray-500 dark:text-gray-400 mb-2"}>
                Select a JSON export from the Beanconqueror app (usually named Beanconqueror.json) and click the process button
                to view your stats.
            </p>
            <p className={"text-gray-500 dark:text-gray-400 mb-4"}>
                The file isn&apos;t uploaded or stored anywhere, only processed in the browser.
            </p>
            <FileUpload callback={(contents) => processBCFile(contents, props.callback)} />
        </div>
    )
}