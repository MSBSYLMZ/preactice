interface QuestionProps {
	children: any;
}

const Question = ({ children }: QuestionProps) => {
	return (
		<div>
			<h4 className="text-3xl text-red">Choose the right option</h4>
			<h2 className="text-4xl my-2"> {children}</h2>
		</div>
	);
};

export default Question;
