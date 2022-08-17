import pathModule from "path";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
const fsPromises = fs.promises;

// TODO: change image type to this.
// type Base64<imageType extends string> = `data:image/${imageType};base64${string}`;

export function getBase64MediaExtension(media: string): string {
	return media.split("/")[1].split(";")[0];
}

export function getMediaType(media: string): string {
	return media.split("data:")[1].split("/")[0];
}

export function getBase64Data(media: string) {
	return media.split("base64,")[1];
}

export function generateFileName(extension: string, name: string): string {
	return `${new Date().getTime()}${name}.${extension}`;
}

export function generatePath(path: string, filename: string): string {
	return pathModule.join(__dirname, `../../public/assets/${path}`) + filename;
}

export function generateMediaUrl(filename: string, additionalPath: string | null = ""): string {
	return "/assets/uploads/" + additionalPath + filename;
}

export async function saveMedia(media: string, folderUnderUploads: string, post_id: string) {
	const mediaType: string = getMediaType(media);
	const extension: string = getBase64MediaExtension(media);
	const base64Data: string = getBase64Data(media);
	const filename: string = generateFileName(extension, uuidv4());
	const mediaPath: string = generatePath(`/uploads/${folderUnderUploads}/`, filename);
	const mediaUrl: string = generateMediaUrl(filename, `${folderUnderUploads}/`);
	const mediaFolder: string = pathModule.join(mediaPath, "../");
	if (!fs.existsSync(mediaFolder)) {
		fs.mkdirSync(mediaFolder, { recursive: true });
	}
	try {
		await fsPromises.writeFile(mediaPath, base64Data, "base64");
	} catch (error) {
		return null;
	}
	return {
		url: mediaUrl,
		type: mediaType,
		post_id,
	};
}
