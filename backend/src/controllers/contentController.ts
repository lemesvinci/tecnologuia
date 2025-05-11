// backend/src/controllers/contentController.ts
import { Request, Response } from 'express';

export const getContents = async (req: Request, res: Response): Promise<void> => {
  try {
    // Simulação de busca de conteúdos
    const contents = [
      { id: 1, title: 'Introdução ao React', category: 'Programação' },
      { id: 2, title: 'Montando um PC Gamer', category: 'Hardware' },
    ];
    res.status(200).json(contents);
  } catch {
    res.status(500).json({ message: 'Erro ao buscar conteúdos' });
  }
};

export const createContent = async (req: Request, res: Response): Promise<void> => {
  const { title, category } = req.body;

  if (!title || !category) {
    res.status(400).json({ message: 'Título e categoria são obrigatórios' });
    return;
  }

  try {
    // Simulação de criação de conteúdo
    res.status(201).json({ message: 'Conteúdo criado com sucesso', content: { title, category } });
  } catch {
    res.status(500).json({ message: 'Erro ao criar conteúdo' });
  }
};