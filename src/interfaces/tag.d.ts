interface BaseTag {
  id: number;
  title: string;
  parentId: int | null;
}

interface SubTag extends BaseTag {
  parentId: int;
}

interface ParentTag extends BaseTag {
  parentId: null;
  icon: string;
  subTags: SubTag[];
}

type Tag = SubTag | ParentTag;
