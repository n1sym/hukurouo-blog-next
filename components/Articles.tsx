import Link from "next/link";

export default function articles({ allPostsData }: {allPostsData:any}) {
  return (
    <ul className="">
      {allPostsData.map(({ id, date, title, tags, description }) => (
        <li className="mb-3" key={id}>
          <Link href={`/articles/${id}`}>
            <a className="text-lg font-semibold text-link-blue ">{title}</a>
          </Link>
          <div className="flex mt-0.5">
            <div className="text-gray-500 text-base pt-tiny">{date} :</div>
            <div>
              {tags.map((tag: string) => {
                return (
                  <Link href="" key={tag}>
                    <a className="text-xs bg-gray-100 text-gray-500 rounded ml-1.5 px-1 py-0.5">
                      {tag}
                    </a>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="text-gray-600 text-sm mt-3 mb-8"></div>
        </li>
      ))}
    </ul>
  );
}
