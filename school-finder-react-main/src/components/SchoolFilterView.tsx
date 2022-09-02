import React, { useEffect, useRef, useState } from "react";
import {
  Drawer,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Divider,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { AutoSizer, List, ListRowProps } from "react-virtualized";
import { Box } from "@mui/system";
import BookmarkOffIcon from "@mui/icons-material/TurnedInNot";
import BookmarkOnIcon from "@mui/icons-material/TurnedIn";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import SchoolItem from "./SchoolFilter/SchoolItemView";
import SearchIcon from "@mui/icons-material/Search";

import {
  FilterSchools,
  GetDistancePostal,
  ListSchools,
} from "../services/SchoolAPI";
import SchoolDetailView from "./SchoolDetailView";
import { School } from "../models/School";
import { getBookmarkStatus } from "../services/BookmarkManager";

interface SchoolFilterProps {
  setSchools: (schools: School[]) => void;
}

enum SortType {
  NAME,
  DISTANCE,
}

interface FilterState {
  // filter
  name: string;
  level: string;
  postalCode: string;

  //sort
  sortType: SortType;
}

const DefaultFilterState: FilterState = {
  name: "",
  level: "",
  postalCode: "",
  sortType: SortType.NAME,
};

export default function SchoolFilterView(props: SchoolFilterProps) {
  const { setSchools } = props;

  const [filter, setFilter] = useState<FilterState>(DefaultFilterState);
  const [state, setState] = useState<{
    schools: School[];
    selectedSchool: number;
    postalCode: string;
    viewBookmark: boolean;
    open: boolean;
  }>({
    schools: [],
    selectedSchool: -1,
    postalCode: "",
    viewBookmark: false,
    open: false,
  });

  const listRef = useRef<List>(null);

  const toggleDrawer = (open: boolean) => (event: KeyboardEvent) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, open: open });
  };

  const showSchoolDetail = (schoolId: number) => {
    setState({ ...state, selectedSchool: schoolId, open: true });
  };

  const rowRenderer = ({ key, index, style }: ListRowProps) => {
    const item = state.schools[index];
    return (
      <Box key={key} style={style}>
        <SchoolItem
          school={item}
          showSchoolDetails={showSchoolDetail}
          bookmarkFilterActive={state.viewBookmark}
        />
      </Box>
    );
  };

  const onClickGetDistanceFromPostal = () => {
    FilterSchools(state.postalCode, filter.name, filter.level)
      // GetDistancePostal(state.postalCode)
      // .then((response) => response.json())
      .then((results) => {
        setState({ ...state, schools: results });
        setSchools(results);
      });
  };
  const toggleBookmarkFilter = () => {
    if (!state.viewBookmark) {
      try {
        console.log("enter function");
        const bookmarks = JSON.parse(localStorage.getItem("Bookmarks") || "");
        setState({
          ...state,
          viewBookmark: !state.viewBookmark,
          schools: bookmarks.map((i: number) =>
            state.schools.find((school) => school.id == i)
          ),
        });
      } catch (err) {
        console.log("Nothing in array");
        setState({
          ...state,
          viewBookmark: !state.viewBookmark,
          schools: [],
        });
      }
    } else {
      console.log("Return to previous view");
      ListSchools()
        .then((response) => response.json())
        .then((results) =>
          setState({
            ...state,
            schools: results,
            viewBookmark: !state.viewBookmark,
          })
        );
    }
  };

  const sortSchools = (event: any) => {
    const option = event.target.value as string;
    if (option == "1") {
      const sorted = [...state.schools];
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      setState({ ...state, schools: sorted });
    } else {
      const sorted = [...state.schools];
      sorted.sort((a, b) => a.distance - b.distance);
      setState({ ...state, schools: sorted });
    }
  };

  useEffect(() => {
    ListSchools()
      .then((response) => response.json())
      .then((results) => setState({ ...state, schools: results }));
  }, []);

  useEffect(() => {
    FilterSchools(state.postalCode, filter.name, filter.level)
      // FilterSchools(filter.name, filter.level)
      // .then((response) => response.json())
      .then((results) => setState({ ...state, schools: results }));
  }, [filter]);

  useEffect(() => {
    setSchools(state.schools);
  }, [state.schools]);

  useEffect(() => {
    listRef.current?.forceUpdate();
    listRef.current?.forceUpdateGrid();
  });

  return (
    <React.Fragment key="right">
      <Drawer
        anchor="left"
        variant="permanent"
        open={true}
        BackdropProps={{ invisible: true }}
      >
        <Box
          height={300}
          width={350}
          padding={2}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          sx={{ bgcolor: "background.paper" }}
        >
          <TextField
            id="search-keyword"
            label="Search Keyword"
            onChange={(event) =>
              setFilter({ ...filter, name: event.target.value })
            }
            type="text"
            size="small"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="Search Keywords">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">
              Select education level
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="input-level"
              label="Select Education Level"
              defaultValue=""
              onChange={(event) =>
                setFilter({ ...filter, level: event.target.value })
              }
              fullWidth
            >
              <MenuItem value="Primary">Primary</MenuItem>
              <MenuItem value="Secondary">Secondary</MenuItem>
              <MenuItem value="Junior College">Junior College</MenuItem>
              <MenuItem value="Polytechnic">Polytechnic</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth size="small">
            <InputLabel id="school-finder-sort-label">
              Sort schools by
            </InputLabel>
            <Select
              labelId="school-finder-sort-label"
              id="input-sort"
              label="Sort schools by"
              defaultValue="1"
              fullWidth
              onChange={sortSchools}
            >
              <MenuItem value={1}>By Name</MenuItem>
              <MenuItem value={2}>By Distance</MenuItem>
            </Select>
          </FormControl>
          <Box display="flex">
            <TextField
              fullWidth
              id="input-postal"
              label="Enter Postal Code"
              onChange={(event) =>
                setState({ ...state, postalCode: event.target.value })
              }
              type="text"
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Enter Postal Code"
                      onClick={onClickGetDistanceFromPostal}
                    >
                      <MapsHomeWorkIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <IconButton onClick={toggleBookmarkFilter}>
              {state.viewBookmark == true ? (
                <BookmarkOnIcon fontSize="medium" />
              ) : (
                <BookmarkOffIcon fontSize="medium" />
              )}
            </IconButton>
          </Box>
        </Box>
        <Divider />
        <Box
          height={"100%"}
          overflow={"auto"}
          paddingY={2}
          sx={{ bgcolor: "background.paper" }}
        >
          <AutoSizer>
            {({ width, height }) => (
              <List
                ref={listRef}
                width={width}
                height={height}
                rowHeight={110}
                rowCount={state.schools.length}
                rowRenderer={rowRenderer}
                style={{ outline: "none" }}
              />
            )}
          </AutoSizer>
        </Box>
      </Drawer>
      <React.Fragment key="right">
        <Drawer
          anchor="right"
          open={state.open}
          variant="temporary"
          onClose={toggleDrawer(false)}
          BackdropProps={{ invisible: true }}
        >
          <SchoolDetailView id={state.selectedSchool} />
        </Drawer>
      </React.Fragment>
    </React.Fragment>
  );
}
