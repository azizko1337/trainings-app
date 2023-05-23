function isBase64UrlImage(base64String: string): boolean {
  return base64String.search("data:image/(png|jpeg|jpg|gif);base64,") === 0;
}

export default isBase64UrlImage;
