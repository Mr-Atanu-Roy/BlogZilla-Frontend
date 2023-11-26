import { TagsBtn, FlexContainer } from "../index"

import { Tag } from "lucide-react"

function TagsPanel() {

    const tags = [
        "physics",
        "chemistry",
        "mathematics",
        "computer science",
        "astrophysics",
        "nature",
        "space",
        "software",
        "programming",
        "technology",
        "engineering",
        "biology",
        "medicine",
        "health",
        "psychology",
        "philosophy",
        "history",
        "politics",
        "economics",
        "finance",
        "business",
        "marketing",
        "education",
        "law",
        "art",
        "music",
        "literature",
        "film",
        "food",
        "travel",
        "culture",
    ]

  return (
    <div>
        <div className="pr-10 flex items-center">
          <Tag className="inline-block w-5 h-5 mr-2 mt-1.5 text-muted-foreground" />
          <p className="font-bold text-xl text-muted-foreground">Read by tags</p>
        </div>
        <FlexContainer className="mt-4 justify-start px-0">
            {tags.map((tag, index) => (
                <TagsBtn key={index} title={tag} className="m-1.5" />
            ))}
        </FlexContainer>
    </div>
  )
}

export default TagsPanel