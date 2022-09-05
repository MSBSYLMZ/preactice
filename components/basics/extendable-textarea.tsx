import { DetailedHTMLProps, HTMLAttributes, ChangeEvent, useState, useEffect } from "react";

const DEFAULT_LINE_HEIGHT = 4;
const DEFAULT_LINE_CHAR_NUMBER = 33;
const INITIAL_TEXTAREA_HEIGHT = 12;
const MAX_TEXTAREA_HEIGHT = 24;

interface IExtendableTextarea extends DetailedHTMLProps<HTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
	handleChange: Function;
}

function ExtendableTextarea(props: IExtendableTextarea) {
	const { className, handleChange: handleParentChange, ...otherProps } = props;
	const [content, setContent] = useState("");
	const [textareaHeight, setTextareaHeight] = useState(INITIAL_TEXTAREA_HEIGHT);

	const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		const value = event.target.value;
		handleParentChange(value);
		setContent(value);
	};

	const handleTextareaHeight = () => {
		const lineCount = Math.ceil(content.length / DEFAULT_LINE_CHAR_NUMBER);
		if (lineCount >= 1 && lineCount < 4) {
			const newTextareaHeight = INITIAL_TEXTAREA_HEIGHT + (lineCount - 1) * DEFAULT_LINE_HEIGHT;
			setTextareaHeight(newTextareaHeight);
		} else if (lineCount >= 4) {
			setTextareaHeight(MAX_TEXTAREA_HEIGHT);
		}
	};
	useEffect(() => {
		handleTextareaHeight();
	}, [content]);

	return <textarea value={content} className={`h-${textareaHeight} ${className}`} {...otherProps} onChange={handleChange}></textarea>;
}

export default ExtendableTextarea;
