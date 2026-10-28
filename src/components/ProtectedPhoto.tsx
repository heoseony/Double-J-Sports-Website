"use client";

import Image, { type ImageProps } from "next/image";

// 사진 저장 방지용 이미지 컴포넌트
// - 우클릭 메뉴 막기 / 드래그 막기 / 이미지 위에 투명 막 덮기
export default function ProtectedPhoto(props: ImageProps) {
  const block = (e: React.SyntheticEvent) => e.preventDefault();
  return (
    <>
      <Image
        {...props}
        draggable={false}
        onContextMenu={block}
        className={`${props.className ?? ""} pointer-events-none select-none`}
      />
      <div
        className="absolute inset-0 [-webkit-touch-callout:none]"
        onContextMenu={block}
        onDragStart={block}
      />
    </>
  );
}
