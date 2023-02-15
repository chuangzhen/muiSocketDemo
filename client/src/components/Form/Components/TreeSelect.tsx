import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TreeView from '@mui/lab/TreeView';
import type { TreeViewProps } from '@mui/lab/TreeView';
import TreeItem, { TreeItemProps, treeItemClasses } from '@mui/lab/TreeItem';
import Typography from '@mui/material/Typography';
import MailIcon from '@mui/icons-material/Mail';
import DeleteIcon from '@mui/icons-material/Delete';
import Label from '@mui/icons-material/Label';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import InfoIcon from '@mui/icons-material/Info';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { SvgIconProps } from '@mui/material/SvgIcon';

import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import {
    FormHelperText,
    FormControl,
    FormGroup,
    FormLabel,
    Tooltip
} from '@mui/material';


import { useFormContext } from 'react-hook-form'

import Select, { SelectChangeEvent } from '@mui/material/Select';
import { maxHeight } from '@mui/system';

// todo 待完善
declare module 'react' {
    interface CSSProperties {
        '--tree-view-color'?: string;
        '--tree-view-bg-color'?: string;
    }
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
type StyledTreeItemProps = TreeItemProps & {
    nodeId?: string;
    bgColor?: string;
    color?: string;
    labelIcon?: React.ElementType<SvgIconProps> | undefined;
    labelInfo?: string;
    labelText: string;
    [rest: string]: any
};
interface TreeSelectOptionsProps<type> extends StyledTreeItemProps {
    child?: type[]
    [rest: string]: any
}

//@ts-ignore
const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
    color: theme.palette.text.secondary,
    [`& .${treeItemClasses.content}`]: {
        color: theme.palette.text.secondary,
        borderTopRightRadius: theme.spacing(2),
        borderBottomRightRadius: theme.spacing(2),
        paddingRight: theme.spacing(1),
        fontWeight: theme.typography.fontWeightMedium,
        '&.Mui-expanded': {
            fontWeight: theme.typography.fontWeightRegular,
        },
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
        },
        '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
            backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
            color: 'var(--tree-view-color)',
        },
        [`& .${treeItemClasses.label}`]: {
            fontWeight: 'inherit',
            color: 'inherit',
        },
    },
    [`& .${treeItemClasses.group}`]: {
        marginLeft: 0,
        [`& .${treeItemClasses.content}`]: {
            paddingLeft: theme.spacing(2),
        },
    },
}));

function StyledTreeItem(props: StyledTreeItemProps) {
    const {
        bgColor,
        color,
        labelIcon: LabelIcon,
        labelInfo,
        labelText,
        ...other
    } = props;

    return (
        //@ts-ignore
        <StyledTreeItemRoot
            label={
                <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
                    {LabelIcon ? <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} /> : null}
                    <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
                        {labelText}
                    </Typography>
                    <Typography variant="caption" color="inherit">
                        {labelInfo}
                    </Typography>
                </Box>
            }
            style={{
                '--tree-view-color': color,
                '--tree-view-bg-color': bgColor,
            }}
            {...other}
        />
    );
}

// const options: TreeSelectOptionsProps<StyledTreeItemProps>[] = [
//     {
//         nodeId: '1',
//         labelText: 'All Mail',
//         labelIcon: MailIcon,
//         child: []
//     },
//     {
//         nodeId: '2',
//         labelText: 'Trash',
//         labelIcon: DeleteIcon,
//         child: []
//     },
//     {
//         nodeId: '3',
//         labelText: 'Categories',
//         labelIcon: Label,
//         child: [
//             {
//                 nodeId: '5',
//                 labelText: 'SocialSocialSocialSocialSocialSocialSocialSocialSocialSocialSocial',
//                 labelIcon: SupervisorAccountIcon,
//                 child: [],
//                 labelInfo: "90",
//                 color: "#1a73e8",
//                 bgColor: "#e8f0fe"
//             },
//             {
//                 nodeId: '6',
//                 labelText: 'Updates',
//                 labelIcon: InfoIcon,
//                 child: [],
//                 labelInfo: "2,294",
//                 color: "#e3742f",
//                 bgColor: "#fcefe3"
//             },
//         ]
//     },

// ]


interface TreeSelectProps extends FormPropsNameSpace.BaseFormFieldProps {

    /**使用useControl时才有defaultValue属性 */
    defaultValue?: string | string[]
    /**是否多选 */
    multiSelect?: boolean
    options: TreeSelectOptionsProps<StyledTreeItemProps>[]
    onSelected?: (v: string | string[]) => void
    treeViewProps?: TreeViewProps
    // [x: string]: any
}

function TreeSelect(props: TreeSelectProps) {
    const { name, treeViewProps = {}, label, onSelected, multiSelect = false, direction = 'column', rules = {}, options, helperText, placeholder, ...rest } = props
    const [selected, setSelected] = React.useState<string[] | string>(multiSelect ? [] : '')

    const { register, formState: { defaultValues, errors }, getValues } = useFormContext()

    if (defaultValues?.[name] && ((typeof defaultValues?.[name] === 'string' && multiSelect) || (defaultValues?.[name] instanceof Array && !multiSelect))) {
        throw Error('ErrorType: The value here is of the wrong type')
        return null
    }

    React.useLayoutEffect(() => {
        setSelected(defaultValues?.[name] || multiSelect ? [] : '')
    }, [defaultValues, multiSelect])

    const { ref, ...fields } = register(`${name}`, { value: defaultValues?.[name], ...rules })

    // 将对象数组扁平化
    const getflatArr = (arr: TreeSelectOptionsProps<StyledTreeItemProps>[]) => {
        let newArr: TreeSelectOptionsProps<StyledTreeItemProps>[] = []
        arr.forEach((i: any) => {
            newArr.push(i)
            if (i?.child?.length > 0) {
                newArr.push(...i.child)
            }
        })

        return newArr
    }
    const flatOptions: TreeSelectOptionsProps<StyledTreeItemProps>[] = getflatArr(options)

    const getTooltipTitle = (s: string[] | string): string => {
        let str = typeof s === 'string' ? [s] : s
        return str.map((c: string) => {
            let obj = flatOptions.find((i: StyledTreeItemProps) => i.nodeId === c)
            return obj?.labelText || false
        }).filter(Boolean).join(' , ')
    }
    return (
        <FormControl sx={{ m: 2, width: 250 }} error={!!errors?.name} required={rules?.required} component="fieldset" variant="outlined">
            <FormGroup row={direction === 'row'}>
                <FormLabel component="legend" sx={direction == 'column' ? { display: 'flex', alignItems: 'center',marginRight:1 } : {}}>{label}</FormLabel>
                <Select
                    // autoWidth
                    multiple={!!multiSelect}
                    displayEmpty
                    value={selected}
                    input={<Tooltip title={getTooltipTitle(selected)}><OutlinedInput /></Tooltip>}
                    renderValue={(selected) => {
                        if (selected.length === 0 || !selected) {
                            return <em style={{ color: 'rgba(0, 0, 0, 0.32)' }}>{placeholder}</em>;
                        }

                        if (!multiSelect) {
                            // 单选
                            return <em style={{ margin: '4px' }} >{selected}</em>
                        } else {

                            let selectedArr = typeof selected === 'string' ? [selected] : selected
                            let selectedTextArr = selectedArr.map(s => {
                                let obj = flatOptions.find((i: StyledTreeItemProps) => i.nodeId === s)
                                return obj?.labelText || false
                            }).filter(Boolean)
                            return <>{selectedTextArr.map((j, idx) => {
                                return <em style={{ margin: '4px' }} >{j}{idx < selectedTextArr.length - 1 ? ',' : ''}</em>
                            })}</>

                        }
                    }}
                    MenuProps={MenuProps}
                    ref={ref}
                    sx={{
                        flex: 1,
                        width: 'maxContent',
                    }}
                    {...fields}
                >
                    {/* @ts-ignore */}
                    <TreeView
                        aria-label="tree-select"
                        multiSelect={!!multiSelect}
                        // defaultExpanded={['3']}
                        selected={selected}
                        onNodeSelect={(event: React.SyntheticEvent, nodeIds: Array<string> | string) => {
                            let nodeId = nodeIds instanceof Array ? nodeIds[0] : nodeIds
                            let newSelect
                            if (!multiSelect) {
                                // single select
                                newSelect = nodeId
                            } else {
                                // mutiple select
                                let selectedArr = typeof selected === 'string' ? [selected] : selected
                                let idx = selectedArr.findIndex(i => i === nodeId)
                                if (idx >= 0) {
                                    newSelect = [...selectedArr]
                                    newSelect.splice(idx, 1)
                                } else {
                                    newSelect = [...selectedArr, nodeId]
                                }

                            }
                            setSelected(newSelect)
                            onSelected && onSelected(newSelect)

                        }}
                        defaultCollapseIcon={<ArrowDropDownIcon />}
                        defaultExpandIcon={<ArrowRightIcon />}
                        defaultEndIcon={<div style={{ width: 24 }} />}
                        sx={{ height: 'maxContent', flexGrow: 1, maxWidth: 600, overflowY: 'auto', overflowX: 'hidden' }}
                        {...treeViewProps}
                    >
                        <>
                            {
                                options.map((i: StyledTreeItemProps) => {
                                    if (i?.child?.length > 0) {
                                        return <StyledTreeItem key={i.nodeId} {...i} nodeId={i.nodeId} labelText={i.labelText} labelIcon={i?.labelIcon}  >
                                            {
                                                i?.child?.map((j: StyledTreeItemProps) => <StyledTreeItem key={j.nodeId} {...j} nodeId={j.nodeId} labelText={j.labelText} labelIcon={j?.labelIcon} />)
                                            }
                                        </StyledTreeItem>
                                    }
                                    return <StyledTreeItem key={i.nodeId} {...i} nodeId={i.nodeId} labelText={i.labelText} labelIcon={i?.labelIcon} />
                                })
                            }
                        </>
                    </TreeView>
                </Select>
            </FormGroup>
            <FormHelperText error={!!errors?.name} id="my-helper-text">
                <>{
                    !!errors?.name ? errors?.name?.message || 'this item is required' : helperText || ''
                }</>
            </FormHelperText>
        </FormControl>
    );
}


export default TreeSelect