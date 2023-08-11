"use client";
import * as React from "react";
import { fuzzy } from "fast-fuzzy";
import TableBody from "./tableBody";
import {
  QuestionMarkCircleIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronUpDownIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";

export default function SongTable({ songs }) {
  const [visibleSongs, setVisibleSongs] = React.useState(
    Object.assign([], songs),
  );
  const [activeSort, setActiveSort] = React.useState("titleAsc");
  const [activeDecade, setActiveDecade] = React.useState("All");
  const [activeSearch, setActiveSearch] = React.useState("");
  const [randomIndex, setRandomIndex] = React.useState(null);

  const stripString = (str) => {
    return str.replace(/[()'"’#:-]/g, "");
  };

  const sortByTitleAsc = (a, b) => {
    const aTitle = stripString(a.title);
    const bTitle = stripString(b.title);
    return aTitle.localeCompare(bTitle);
  };

  const sortByTitleDesc = (a, b) => {
    const aTitle = stripString(a.title);
    const bTitle = stripString(b.title);
    return bTitle.localeCompare(aTitle);
  };

  const sortByArtistAsc = (a, b) => {
    const aArtist = stripString(a.artist);
    const bArtist = stripString(b.artist);
    return aArtist.localeCompare(bArtist);
  };

  const sortByArtistDesc = (a, b) => {
    const aArtist = stripString(a.artist);
    const bArtist = stripString(b.artist);
    return bArtist.localeCompare(aArtist);
  };

  const sortByYearAsc = (a, b) => {
    return a.year.localeCompare(b.year);
  };

  const sortByYearDesc = (a, b) => {
    return b.year.localeCompare(a.year);
  };

  const refreshSongs = () => {
    var updatedSongs = Object.assign([], songs);
    // Decade filtering
    switch (activeDecade) {
      case "1940s":
        updatedSongs = updatedSongs.filter(
          (song) => song.year >= 1940 && song.year < 1950,
        );
        break;
      case "1950s":
        updatedSongs = updatedSongs.filter(
          (song) => song.year >= 1950 && song.year < 1960,
        );
        break;
      case "1960s":
        updatedSongs = updatedSongs.filter(
          (song) => song.year >= 1960 && song.year < 1970,
        );
        break;
      case "1970s":
        updatedSongs = updatedSongs.filter(
          (song) => song.year >= 1970 && song.year < 1980,
        );
        break;
      case "1980s":
        updatedSongs = updatedSongs.filter(
          (song) => song.year >= 1980 && song.year < 1990,
        );
        break;
      case "1990s":
        updatedSongs = updatedSongs.filter(
          (song) => song.year >= 1990 && song.year < 2000,
        );
        break;
      case "2000s":
        updatedSongs = updatedSongs.filter(
          (song) => song.year >= 2000 && song.year < 2010,
        );
        break;
      case "2010s":
        updatedSongs = updatedSongs.filter(
          (song) => song.year >= 2010 && song.year < 2020,
        );
        break;
      case "2020s":
        updatedSongs = updatedSongs.filter(
          (song) => song.year >= 2020 && song.year < 2030,
        );
        break;
    }

    // Search filtering
    if (activeSearch?.length > 0) {
      updatedSongs = updatedSongs.filter(
        (song) =>
          fuzzy(activeSearch, song.title) >= 1 ||
          fuzzy(activeSearch, song.artist) >= 1,
      );
    }

    switch (activeSort) {
      case "titleDesc":
        updatedSongs.sort(sortByTitleDesc);
        break;
      case "artistAsc":
        updatedSongs.sort(sortByArtistAsc);
        break;
      case "artistDesc":
        updatedSongs.sort(sortByArtistDesc);
        break;
      case "yearAsc":
        updatedSongs.sort(sortByYearAsc);
        break;
      case "yearDesc":
        updatedSongs.sort(sortByYearDesc);
        break;
      case "titleAsc":
      default:
        updatedSongs.sort(sortByTitleAsc);
    }

    setVisibleSongs(updatedSongs);
  };

  const handleTitleSort = (event) => {
    event.preventDefault();

    if (activeSort === "titleAsc") {
      setActiveSort("titleDesc");
    } else {
      setActiveSort("titleAsc");
    }
  };

  const handleArtistSort = (event) => {
    event.preventDefault();

    if (activeSort === "artistAsc") {
      setActiveSort("artistDesc");
    } else {
      setActiveSort("artistAsc");
    }
  };

  const handleYearSort = (event) => {
    event.preventDefault();

    if (activeSort === "yearAsc") {
      setActiveSort("yearDesc");
    } else {
      setActiveSort("yearAsc");
    }
  };

  const handleFilterDecade = (event) => {
    event.preventDefault();
    setActiveDecade(event.target.value);
  };

  const handleSearchChange = (event) => {
    setActiveSearch(event.target.value);
  };

  const handleReset = (event) => {
    event.preventDefault();
    setActiveSort("titleAsc");
    setActiveDecade("All");
    setActiveSearch("");
    setRandomIndex(null);
    refreshSongs();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleRandom = (event) => {
    event.preventDefault();
    const randomIndex = Math.floor(Math.random() * visibleSongs.length);
    setRandomIndex(randomIndex);
  };

  React.useEffect(() => {
    refreshSongs();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSort, activeDecade, activeSearch]);

  React.useEffect(() => {
    const elem = document.getElementById("random");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [randomIndex]);

  return (
    <>
      <header className="sticky top-0 bg-white w-full space-y-4 p-4 pl-5 md:pl-[10%]">
        <div className="my-5 flex flex-wrap">
          <div className="flex flex-row mb-1">
            <div className="relative min-w-max">
              <select
                onChange={handleFilterDecade}
                value={activeDecade}
                className="appearance-none h-full text-xl rounded-r border-t border-r border-l border-b block appearance-none w-full border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight"
              >
                <option>All</option>
                <option>1940s</option>
                <option>1950s</option>
                <option>1960s</option>
                <option>1970s</option>
                <option>1980s</option>
                <option>1990s</option>
                <option>2000s</option>
                <option>2010s</option>
                <option>2020s</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDownIcon className="h-4 w-4" />
              </div>
            </div>
          </div>
          <div className="block relative sm:min-w-[82%] md:min-w-[80%] lg:min-w-[50%] mb-1">
            <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
              <MagnifyingGlassIcon className="h-5 w-5" />
            </span>
            <input
              placeholder="Search"
              value={activeSearch}
              onChange={handleSearchChange}
              className="appearance-none text-xl rounded-r rounded-l border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white placeholder-gray-400 text-gray-700"
            />
          </div>
          <div className="block min-w-max relative mb-1 pl-0 pr-1 lg:pr-5 lg:pl-5">
            <a
              onClick={handleReset}
              className="hover:bg-red-400 hover:cursor-pointer group flex items-center rounded-md bg-red-500 text-white text-xl font-medium pl-2 pr-3 py-2 shadow-sm"
            >
              <XMarkIcon className="h-6 w-6 pr-2" /> Reset
            </a>
          </div>
          <div className="block min-w-max relative">
            <a
              onClick={handleRandom}
              className="hover:bg-blue-400 hover:cursor-pointer group flex items-center rounded-md bg-blue-500 text-white text-xl font-medium pl-2 pr-3 py-2 shadow-sm"
            >
              <QuestionMarkCircleIcon className="h-6 w-6 pr-2" /> Random
            </a>
          </div>
        </div>
      </header>
      <div className="border rounded-lg mb-20 min-w-[90%] min-h-[500px]">
        <table className="rounded-md table-auto text-sm text-left text-gray-500 w-full">
          <thead className="text-xl text-gray-700 uppercase bg-sky-50">
            <tr>
              <th scope="col" className="px-6 py-3 w-1/2">
                <div className="flex items-center">
                  Song
                  <a href="#" onClick={handleTitleSort}>
                    {activeSort === "titleAsc" && (
                      <ChevronUpIcon className="h-5 w-5" />
                    )}
                    {activeSort === "titleDesc" && (
                      <ChevronDownIcon className="h-5 w-5" />
                    )}
                    {activeSort !== "titleAsc" &&
                      activeSort !== "titleDesc" && (
                        <ChevronUpDownIcon className="h-5 w-5" />
                      )}
                  </a>
                </div>
              </th>
              <th scope="col" className="px-6 py-3 w-2/6">
                <div className="flex items-center">
                  Artist
                  <a href="#" onClick={handleArtistSort}>
                    {activeSort === "artistAsc" && (
                      <ChevronUpIcon className="h-5 w-5" />
                    )}
                    {activeSort === "artistDesc" && (
                      <ChevronDownIcon className="h-5 w-5" />
                    )}
                    {activeSort !== "artistAsc" &&
                      activeSort !== "artistDesc" && (
                        <ChevronUpDownIcon className="h-5 w-5" />
                      )}
                  </a>
                </div>
              </th>
              <th scope="col" className="px-6 py-3 w-1/6">
                <div className="flex items-center">
                  Year
                  <a href="#" onClick={handleYearSort}>
                    {activeSort === "yearAsc" && (
                      <ChevronUpIcon className="h-5 w-5" />
                    )}
                    {activeSort === "yearDesc" && (
                      <ChevronDownIcon className="h-5 w-5" />
                    )}
                    {activeSort !== "yearAsc" && activeSort !== "yearDesc" && (
                      <ChevronUpDownIcon className="h-5 w-5" />
                    )}
                  </a>
                </div>
              </th>
            </tr>
          </thead>
          <TableBody songs={visibleSongs} randomIndex={randomIndex} />
        </table>
      </div>
    </>
  );
}
