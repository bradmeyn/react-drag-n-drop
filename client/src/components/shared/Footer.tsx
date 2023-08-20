import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export default function Footer() {
  const date = new Date().getFullYear();
  return (
    <footer className="text-slate-300 mt-auto items-center p-4 bg-neutral text-neutral-content justify-center">
      <div className="text-center">
        <p className=" mb-2 flex items-center justify-center text-sm">
          <span className="mr-2">Developed by</span>
          <a
            href={"https://www.bradmeyn.com"}
            target="_blank"
            rel="noreferrer"
            className="text-white underline-offset-2 hover:underline font-bold"
          >
            Brad Meyn
          </a>
          <span className="px-2">&#8226;</span>
          <a
            href={"https://www.github.com/bradmeyn/workshop"}
            target="_blank"
            rel="noreferrer"
            className="font-bold flex items-center justify-center text-sm text-white underline-offset-2 hover:underline"
          >
            <FontAwesomeIcon icon={faGithub as IconProp} className="mr-2 " />{" "}
            <span>GitHub</span>
          </a>
        </p>

        <p className="text-xs">
          Copyright © {new Date().getFullYear()} - All right reserved
        </p>
      </div>
    </footer>
  );
}
