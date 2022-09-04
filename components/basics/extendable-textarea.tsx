import { DetailedHTMLProps, HTMLAttributes, ChangeEvent, useState, useEffect } from "react";

const DEFAULT_LINE_HEIGHT = 4;
const DEFAULT_LINE_CHAR_NUMBER = 33;
const INITIAL_TEXTAREA_HEIGHT = 12;
const MAX_TEXTAREA_HEIGHT = 24;

function ExtendableTextarea(props: DetailedHTMLProps<HTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>) {
	const { className, ...otherProps } = props;
	const [content, setContent] = useState("");
	const [textareaHeight, setTextareaHeight] = useState(INITIAL_TEXTAREA_HEIGHT);

	const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		const value = event.target.value;
		setContent(value);
	};

	const handleTextareaHeight = () => {
		const lineCount = Math.ceil(content.length / DEFAULT_LINE_CHAR_NUMBER);
		console.log("line count", lineCount);
		if (lineCount >= 1 && lineCount < 4) {
			const newTextareaHeight = INITIAL_TEXTAREA_HEIGHT + (lineCount - 1) * DEFAULT_LINE_HEIGHT;
			console.log("new height", newTextareaHeight);
			setTextareaHeight(newTextareaHeight);
		} else if (lineCount >= 4) {
			setTextareaHeight(MAX_TEXTAREA_HEIGHT);
		}
	};
	useEffect(() => {
		handleTextareaHeight();
	}, [content]);
	console.log("height", textareaHeight);

	return <textarea value={content} className={`h-${textareaHeight} ${className}`} {...otherProps} onChange={handleChange}></textarea>;
}

export default ExtendableTextarea;
