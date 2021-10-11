import Link from "next/link";

export default function articles({
  allPostsData,
  tag,
}: {
  allPostsData: any;
  tag?: any;
}) {
  return (
    <ul className="list-disc pl-5">
      {allPostsData.map(({ id, date, title, tags}) => (
        <li className="" key={id}>
          <Link href={`/articles/${id}`}>
            <a className="text-gray-800 leading-7 text-lg ">{title}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
}
