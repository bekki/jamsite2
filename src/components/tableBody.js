"use client";
import * as React from "react";

export default function TableBody({ songs, randomIndex }) {
  return (
    <tbody>
      {songs.length > 0 &&
        songs.map((song, i) => (
          <tr
            key={song.uuid}
            id={i === randomIndex ? "random" : undefined}
            className={`text-xl ${
              i === randomIndex ? "bg-amber-100" : (i % 2 === 0 ? "bg-white" : "bg-gray-100")
            } border-b hover:bg-sky-50`}
          >
            <td className="px-6 py-4 w-1/2">
              <a href={song.viewLink} target="_new">
                {song.title}
              </a>
            </td>
            <td className="px-6 py-4 w-2/6">{song.artist}</td>
            <td className="px-6 py-4 w-1/6">{song.year}</td>
          </tr>
        ))}
    </tbody>
  );
}
