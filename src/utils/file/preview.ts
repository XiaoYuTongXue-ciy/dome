// 原始file 转 dataUrl
export const fileToDataUrl = (file) => {
  const type = file.type;
  return window.URL.createObjectURL(new Blob([file], { type }));
};

// 在线文件预览
export const onlinePreview = (fileUrl) => {
  const url = `http://pfile.com.cn/api/profile/onlinePreview?url=${fileUrl}`;
  window.open(url);
};
