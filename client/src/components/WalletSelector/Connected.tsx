import Spinner from "../Spinner";

export default function Connected({
  address,
  onClick,
  connecting,
  iconUrl,
  prefix,
}: {
  address: string;
  onClick: () => void;
  connecting: boolean;
  iconUrl?: string;
  prefix?: string;
}) {
  return (
    <div
      className="rounded-lg background flex items-center justify-center px-5 py-2.5 cursor-pointer flex items-center gap-2"
      onClick={onClick}
    >
      {connecting ? (
        <div className="flex flex-row items-center gap-2">
          Connecting
          <Spinner></Spinner>
        </div>
      ) : (
        <>
          {iconUrl ? (
            <img src={iconUrl} className="h-5" alt="wallet icon"></img>
          ) : null}
          <p>
            {prefix}
            {address}
          </p>
        </>
      )}
    </div>
  );
}
