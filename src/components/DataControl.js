import axios from 'axios';
import React, { useState, useEffect } from 'react';



export default function DataControl() {
    const [revealDeleters, setRevealDeleters] = useState(false)
    return (
        <div>
            {revealDeleters ?
                <div>
                    <div>
                        <button onClick={() => axios.get('http://127.0.0.1:5000/clear/the-matter')}>Delete All The Matter</button>
                        <button onClick={() => axios.get('http://127.0.0.1:5000/clear/the-cloud')}>Delete All The Cloud</button>
                        <button onClick={() => axios.get('http://127.0.0.1:5000/clear/thairath')}>Delete All Thairath</button>
                    </div>
                    <div>
                        <button onClick={() => setRevealDeleters(false)}>Hide them</button>
                    </div>

                </div>
                :
                <button onClick={() => setRevealDeleters(true)}>Click If You Want To Wipe The Database</button>}
        </div>
    )
}