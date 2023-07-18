import ffmpeg from 'fluent-ffmpeg';
import { Readable } from 'stream';

export class ImageService {
	public convertImage(image: Readable, outputName: string) {
		ffmpeg().input(image).saveToFile(outputName);
	}
}
