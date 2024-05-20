using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;
using System.Text.Json;
using LobeVidol.Server.Models.Chat;
using Microsoft.AspNetCore.Mvc;
using StableDiffusion.NET;

namespace LobeVidol.Server.Controllers;

[ApiController]
[Route("[controller]")]

public class ImageController
{
    [HttpPost("generate")]
    public async Task Generate([FromBody] JsonElement jsonString)
    {
        RootModel rootModel = JsonSerializer.Deserialize<RootModel>(jsonString.ToString());
        var enteredPromt = rootModel.Messages.LastOrDefault()?.Content;

        var stableDiffusionParameter = new StableDiffusionParameter()
        {
            Width = 1024,
            Height = 1024,
            NegativePrompt = ""
        };

        using StableDiffusionModel sd = new(@"D:\Work\Models\sd_xl_turbo_1.0.safetensors", new ModelParameter());
        using StableDiffusionImage image = sd.TextToImage(enteredPromt, stableDiffusionParameter);

        string filePath = @"D:\output.png";
        SaveImage(image, filePath);

        //TODO 
        void SaveImage(StableDiffusionImage stableDiffusionImage, string filePath)
        {
            // Get image properties
            int width = stableDiffusionImage.Width;
            int height = stableDiffusionImage.Height;
            int bpp = stableDiffusionImage.Bpp; // Bytes per pixel

            // Create a new Bitmap
            Bitmap bitmap = new Bitmap(width, height, PixelFormat.Format24bppRgb);

            // Lock the bitmap's bits
            BitmapData bmpData = bitmap.LockBits(new Rectangle(0, 0, width, height), ImageLockMode.WriteOnly, bitmap.PixelFormat);

            // Get the address of the first line
            IntPtr ptr = bmpData.Scan0;

            // Copy the image data to the bitmap
            Marshal.Copy(stableDiffusionImage.Data.ToArray(), 0, ptr, width * height * bpp);

            // Unlock the bits
            bitmap.UnlockBits(bmpData);

            // Save the image
            bitmap.Save(filePath, ImageFormat.Png);

            // Dispose the bitmap
            bitmap.Dispose();
        }
    }
}
