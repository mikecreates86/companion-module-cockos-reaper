-- companion_save_project.lua
-- Used by the Companion "Save Project" action.
-- Already saved project  -> normal save.
-- Never saved project    -> save as the name sent by Companion.
-- Install: REAPER > Actions > Show action list > New action > Load ReaScript...
-- then copy the script's Command ID into the module config.

local SECTION = "Companion"

local function take(key)
  local v = reaper.GetExtState(SECTION, key)
  reaper.DeleteExtState(SECTION, key, false)
  return v
end

local name = take("name")
local folder = take("folder")

local _, projfn = reaper.EnumProjects(-1)

if projfn and projfn ~= "" then
  reaper.Main_SaveProject(0, false)
  return
end

local sep = reaper.GetOS():match("Win") and "\\" or "/"

name = name:gsub('[<>:"/\\|?*%c]', "_"):gsub("^%s+", ""):gsub("%s+$", "")
if name == "" then
  reaper.ShowMessageBox("Companion did not send a project name, so the project was not saved.", "Companion Save", 0)
  return
end
if not name:lower():match("%.rpp$") then name = name .. ".rpp" end

if folder == "" then
  folder = reaper.GetProjectPath("")
else
  folder = folder:gsub("|", sep)
end
folder = folder:gsub("[/\\]+$", "")

if not reaper.APIExists("Main_SaveProjectEx") then
  reaper.ShowMessageBox("This REAPER version cannot save by file name from a script. Please update REAPER.", "Companion Save", 0)
  return
end

reaper.RecursiveCreateDirectory(folder, 0)
reaper.Main_SaveProjectEx(0, folder .. sep .. name, 0)
