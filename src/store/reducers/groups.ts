import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Group {
  id: number;
  name: string;
  color?: string;
}

interface GroupsProps {
  groups: Group[];
}

const initialState: GroupsProps = {
  groups: [],
};

const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    createGroup: (state, action: PayloadAction<Partial<Group>>) => {
      const newGroupId = state.groups.length + 1;
      const newGroup = {
        id: newGroupId > 0 ? newGroupId : 1,
        ...action.payload,
      };
      state.groups.push(newGroup as Group);
    },
    deleteGroup: (state, action: PayloadAction<number>) => {
      const groupIdToDelete = action.payload;
      state.groups = state.groups.filter(
        (group) => group.id !== groupIdToDelete
      );
    },
    updateGroup: (state, action: PayloadAction<Group>) => {
      const updatedGroup = action.payload;
      const index = state.groups.findIndex(
        (group) => group.id === updatedGroup.id
      );
      if (index !== -1) {
        state.groups[index] = updatedGroup;
      }
    },
  },
});

export const { createGroup, deleteGroup, updateGroup } = groupsSlice.actions;
export default groupsSlice.reducer;

export const selectorGroups = (state: { groups: GroupsProps }): GroupsProps =>
  state.groups;
