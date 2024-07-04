import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class RandomImageService {
  private readonly apiUrl = 'https://random.dog/doggos';

  async fetchRandomPicture(): Promise<string> {
    try {
      const response = await axios.get(this.apiUrl);
      return response.data;
    } catch (error) {
      console.error('Error fetching random picture:', error);
      throw error;
    }
  }

  async fetchRandomPictures(): Promise<string[]> {
    try {
      const response = await axios.get(this.apiUrl);
      return response.data;
    } catch (error) {
      console.error('Error fetching random pictures:', error);
      throw error;
    }
  }
}
