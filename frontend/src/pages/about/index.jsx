

import Link from 'next/link'
import React from 'react'

const AboutPage = () => {
  return (
    <div className="space-y-3">
        <h1>Tentang App Kasir Festo</h1>
        <p>Ya jadi maap saya males ngisi halaman about ini <br/>
            jadi ya intinya ini aplikasi kasir dibuat sama <br/>
            Al Sakha dan ini tuh tugas dari guru suruh bikin ini <br/>
            tujuan nya buat aplikasi ini ya biar dapet nilai <br/>
            jadi ya yaudah sih gitu doang. <br/>
            {"(yaudah sana balik ke halaman utama kalau dah selesai baca)"}
        </p>
        <div className="flex space-x-2">
            <h3>Nih tombol baliknya : </h3>
            <Link className="text-green-400" href="/">Back</Link>
        </div>
    </div>
  )
}

export default AboutPage