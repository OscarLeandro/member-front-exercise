import axios from "axios";
import FormData from "form-data";
import { useState } from "react";

export default function Paginafoto() {
  const [selectedFile, setSelectedFile] = useState(null);
  async function handleFileInput(e) {
    //const type = e.target.files[0].type.toLowerCase();
    //console.log(type)
    // if (
    //   type != "image/webp" &&
    //   type != "image/png" &&
    //   type != "image/gif" &&
    //   type != "image/jpeg"
    // ) {
    //   console.log("Error al subir la imágen. Formatos permitidos webp,png,gif o jpeg")

    //   return;
    // }

    // if (e.target.files[0].size > 10485760) {
    //   console.log("Error al subir la imágen. Tamaño máx 10mb");
    //   return;
    // }

    // let imgName = e.target.files[0].name;

    // let dotIndex = imgName.lastIndexOf(".");
    // console.log('dotIndex',dotIndex);
    // let cutDot = imgName.slice(0, dotIndex);
    // let maxLength = cutDot.slice(0, 25);

    // setName(maxLength);
    // setSize(e.target.files[0].size);
    //setSelectedFile(e.target.files);
    // console.log(e.target.files[0])
    // console.log(selectedFile)

    //let url = URL.createObjectURL(e.target.files[0]);
    //console.log(url);
    //setLocalUrlImage(url);
    //setStep(1);
    try {
      const body = new FormData();

      body.append("file", e.target.files[0], "OSCAR-" + "PHOTO1");
      const linkCloudflareImage ="https://upload.imagedelivery.net/ShEDXK23Lfp1VZT-wVhHdA/c6be8ca5-6233-4bfc-1505-96835c02b100";
      const { data } = await axios.post(linkCloudflareImage, body);
      const basicURL = "https://imagedelivery.net/ShEDXK23Lfp1VZT-wVhHdA/";
      console.log(basicURL + data.result.id + "/public");
    } catch (error) {
      console.log(error);
    }

    console.log(selectedFile)
  }

  return (
    <div>
      <div className="file-uploader py-4">
        <input type="file" onChange={handleFileInput} />
        <button
          onClick={(e) => fileInput.current && fileInput.current.click()}
        />
      </div>
    </div>
  );
}
