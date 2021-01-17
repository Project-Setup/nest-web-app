import { promises } from 'fs';
import { basename, resolve } from 'path';
import { Logger } from '@nestjs/common';
import { Folders } from '~shared/types/types';

const logger = new Logger('loadSecrets');

const { readdir, stat, readFile } = promises;

const findFilesInFolderIteratively = async (...folderList: Folders) => {
  const files: string[] = [];
  const foldersInRead: string[] = [...folderList];

  while (foldersInRead.length) {
    const folderPath = foldersInRead.shift();
    const folderContent = await readdir(folderPath);
    const extraFolders: string[] = [];
    for (const content of folderContent) {
      const contentPath = resolve(folderPath, content);
      const status = await stat(contentPath);
      if (status.isFile) {
        files.push(contentPath);
      } else if (status.isDirectory) {
        extraFolders.push(contentPath);
      }
    }
    foldersInRead.unshift(...extraFolders);
  }

  return files;
};

const loadSecretsFromFolders = (...folderList: Folders) => async () => {
  const files = await findFilesInFolderIteratively(...folderList);
  const secrets: Record<string, string> = {};
  for (const file of files) {
    try {
      const value = await readFile(file, 'utf-8');
      const key = basename(file);
      secrets[key] = value;
    } catch (err) {
      logger.warn('cannot fetch secret from: ', file);
    }
  }
  return secrets;
};

export default loadSecretsFromFolders;
