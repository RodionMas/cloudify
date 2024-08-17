export const pathFn = (pathname: string) => {
    const parts = pathname.split('userfolder')
    const result = parts[1].substring(1)
    return result
  }

  export const newUrlFn = (pathname: string) => {
    const lastSlashIndex = pathname.lastIndexOf("/");
    const newUrl = pathname.substring(0, lastSlashIndex);
    return newUrl;
  };