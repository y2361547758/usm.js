import { createFFmpeg } from "@ffmpeg/ffmpeg";

let crid = new CRID();
let worker = createFFmpeg({ log: true })

async function mux(crid: CRID) {
    await worker.load()
    await worker.write('/v.ivf', crid.video)
    await worker.write('/a.adx', crid.audio)
    await worker.run('-i /v.ivf -i /a.adx -c:v copy /o.mp4')
    const data = await worker.read('/o.mp4')
    return data;
}

(async () => {
    const res = await fetch("movie_3047.usm");
    const ab = await res.arrayBuffer();
    await crid.demuxAsync(ab)
    const stream = await mux(crid);
    let video = document.getElementsByTagName('video')[0]
    video.src = URL.createObjectURL(new Blob([stream]));
})();