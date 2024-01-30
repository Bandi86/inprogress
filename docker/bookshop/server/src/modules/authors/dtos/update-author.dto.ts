import { PartialType } from "@nestjs/mapped-types"
import CreateAuthorDto  from "./create-author.dto"

export default  class UpdateAuthorDto extends PartialType(CreateAuthorDto) {}