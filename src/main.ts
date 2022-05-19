import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { getFromContainer, MetadataStorage } from "class-validator";
import { validationMetadatasToSchemas } from "class-validator-jsonschema";
import { writeFileSync } from "fs";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    credentials: true,
  });

  const OPENAPI_FILE = "game-backend-openapi.json";
  const configService = app.get(ConfigService);
  const config = new DocumentBuilder()
    .setTitle("SRS-Game")
    .setDescription("The SRS Project - Group 3")
    .setVersion("1.0")
    .addTag("game")
    .build();
  const document = SwaggerModule.createDocument(app, config);

  // Creating all the swagger schemas based on the class validator decorator
  const metadatas = (getFromContainer(MetadataStorage) as any).validationMetadatas;
  const schemas = validationMetadatasToSchemas(metadatas);

  if (document && document.components) document.components.schemas = schemas;

  SwaggerModule.setup("api", app, document);

  writeFileSync(OPENAPI_FILE, JSON.stringify(document), { encoding: "utf8" });

  await app.listen(configService.get("PORT"));
}
bootstrap();
