import { Injectable } from '@nestjs/common';
import Docker from 'dockerode';

@Injectable()
export class AppService {
  private docker: Docker;

  constructor() {
    this.docker = new Docker({ socketPath: '/var/run/docker.sock' })
  }

  private async pullImage(image: string): Promise<void> {
    const stream = await new Promise<NodeJS.ReadableStream>((resolve, reject) => {
      this.docker.pull(image, (err, stream) => {
        if (err) return reject(err);
        if (!stream) return reject(new Error('Docker pull did not return a stream'));
        resolve(stream);
      });
    });

    await new Promise<void>((resolve, reject) => {
      this.docker.modem.followProgress(
        stream,
        (err: unknown) => (err ? reject(err) : resolve()),
      );
    });
  }

  async up() {
    await this.down()

    const image = 'node:alpine';

    await this.pullImage(image);

    const container = await this.docker.createContainer({
      Image: 'node:alpine',
      Cmd: ['sleep', '3600'],
      name: 'my-dynamic-node'
    })

    container.start()

    return 'Контейнер запущен!'
  }

  async down() {
    try {
      const container = this.docker.getContainer('my-dynamic-node')
      const data = await container.inspect()

      if (data.State.Running) {
        await container.stop()
      }

      await container.remove()
      return 'Контейнер успешно остановлен и удален!';
    } catch (error: any) {
      if (error.statusCode === 404) {
        return 'Контейнера не существует.';
      }
      throw error;
    }
  }
}
