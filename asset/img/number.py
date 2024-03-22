import os
from PIL import Image

def rename_images(folder_path):
    # 获取文件夹中所有图像文件的列表
    image_files = [f for f in os.listdir(folder_path) if f.endswith(('.jpg','.JPG', '.jpeg', '.png', '.gif'))]

    # 对每个图像文件进行编号并重命名
    for i, filename in enumerate(image_files, start=1):
        _, ext = os.path.splitext(filename)
        new_filename = f"{i}{ext}"
        os.rename(os.path.join(folder_path, filename), os.path.join(folder_path, new_filename))
        print(f"Renaming {filename} to {new_filename}")

# 指定文件夹路径
folder_path = './index'

# 调用函数对文件夹中的图片进行编号
rename_images(folder_path)
