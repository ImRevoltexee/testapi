import axios from 'axios';

const apiEndpoint = 'https://alkitab.hkbppansuran.live/api';

async function getVerse(book, chapter, verse) {
  const response = await axios.get(`${apiEndpoint}/bible/${book}/${chapter}/${verse}`);
  return response.data;
}

export default async function handler(req, res) {
  const { book, chapter, verse } = req.query;

  if (!book || !chapter || !verse) {
    return res.status(400).json({ error: 'Book, chapter, and verse are required' });
  }

  try {
    const verseData = await getVerse(book, chapter, verse);
    res.status(200).json(verseData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch verse' });
  }
}
