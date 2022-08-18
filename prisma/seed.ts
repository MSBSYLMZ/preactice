import { PrismaClient } from "@prisma/client";
const questionData = [
	{
		text: "Çağırsaydın gelmez miydim yar?",
		options: {
			create: [
				{
					text: "Gelirdin",
					correct: false,
				},
				{
					text: "Gelmezdin",
					correct: true,
				},
			],
		},
	},
	{
		text: "Senin için ölmez miydim yar?",
		options: {
			create: [
				{
					text: "Ölürdün",
					correct: false,
				},
				{
					text: "Ölmezdin",
					correct: true,
				},
			],
		},
	},
	{
		text: "Dünyayı ters etmez miydim yar?",
		options: {
			create: [
				{
					text: "Ederdin",
					correct: false,
				},
				{
					text: "Etmezdin",
					correct: true,
				},
			],
		},
	},
	{
		text: "Arar mısın?",
		options: {
			create: [
				{
					text: "Arar sorarım birdaha",
					correct: false,
				},
				{
					text: "Aramam sormam bir daha",
					correct: true,
				},
			],
		},
	},
	{
		text: "Ne yapsam bile?",
		options: {
			create: [
				{
					text: "Yalvarsan bile Allah'a",
					correct: true,
				},
				{
					text: "50 Şınav üst üste çeksen bile",
					correct: false,
				},
			],
		},
	},
	{
		text: "Ne yaptın en fazla?",
		options: {
			create: [
				{
					text: "Peşinden geldim kaç kere",
					correct: true,
				},
				{
					text: "Hiç bir şey yapmadım",
					correct: false,
				},
			],
		},
	},
	{
		text: "Ben ne yaptım karşılığında?",
		options: {
			create: [
				{
					text: "Dünyamı yıktın bin kere",
					correct: true,
				},
				{
					text: "Teleskop satın aldın",
					correct: false,
				},
			],
		},
	},
	{
		text: "Ee barışır mıyız?",
		options: {
			create: [
				{
					text: "Kırıldım sana bir kere",
					correct: true,
				},
				{
					text: "Barışırız yahu ne demek",
					correct: false,
				},
			],
		},
	},
	{
		text: "Çıkışta arar mısın?",
		options: {
			create: [
				{
					text: "Ararım",
					correct: false,
				},
				{
					text: "Aramam",
					correct: true,
				},
			],
		},
	},
	{
		text: "Yanıyorum söndürelim mi?",
		options: {
			create: [
				{
					text: "Olmaz",
					correct: false,
				},
				{
					text: "Tabi Tabi",
					correct: true,
				},
			],
		},
	},
	{
		text: "Çıktı ateşim indirelim mi?",
		options: {
			create: [
				{
					text: "Tabi tabi",
					correct: true,
				},
				{
					text: "İtfaiye miyim ben?",
					correct: false,
				},
			],
		},
	},
	{
		text: "Bu sözler lafta kalırsa ne yaparsın?",
		options: {
			create: [
				{
					text: "Senin o tabini tabini yerim",
					correct: true,
				},
				{
					text: "Yemek servisi",
					correct: false,
				},
			],
		},
	},
	{
		text: "Gölbaşında ne çoktur?",
		options: {
			create: [
				{
					text: "Gülleri",
					correct: true,
				},
				{
					text: "Pezevenkleri",
					correct: false,
				},
			],
		},
	},
	{
		text: "Kimler geliyor?",
		options: {
			create: [
				{
					text: "Güzeller",
					correct: true,
				},
				{
					text: "Eminem",
					correct: false,
				},
			],
		},
	},
	{
		text: "Sevdiğin nerde?",
		options: {
			create: [
				{
					text: "Sevdiğim yoktur",
					correct: true,
				},
				{
					text: "Who knows?",
					correct: false,
				},
			],
		},
	},
	{
		text: "Gelin neli?",
		options: {
			create: [
				{
					text: "Şalvarlı gelin",
					correct: true,
				},
				{
					text: "Çikolatalı",
					correct: false,
				},
			],
		},
	},
];
const prisma = new PrismaClient();

async function main() {
	questionData.forEach(async item => {
		await prisma.question.create({
			data: item,
		});
	});
}

main()
	.catch(e => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
